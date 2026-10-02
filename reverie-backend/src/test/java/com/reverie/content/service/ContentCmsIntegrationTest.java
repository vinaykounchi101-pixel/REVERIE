package com.reverie.content.service;

import com.reverie.content.dto.*;
import com.reverie.testutil.TestDataCleaner;
import com.reverie.user.entity.Role;
import com.reverie.user.entity.User;
import com.reverie.user.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.test.context.ActiveProfiles;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@ActiveProfiles("test")
public class ContentCmsIntegrationTest {

    @Autowired
    private ContentService contentService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private TestDataCleaner testDataCleaner;

    private User editorAdmin;

    @BeforeEach
    void setUp() {
        testDataCleaner.cleanAll();

        editorAdmin = new User();
        editorAdmin.setEmail("editor.chief@reverie.app");
        editorAdmin.setPasswordHash("hashed_pass");
        editorAdmin.setFirstName("Editor");
        editorAdmin.setLastName("In Chief");
        editorAdmin.setRole(Role.CONTENT_MGR);
        editorAdmin.setVerified(true);
        editorAdmin = userRepository.save(editorAdmin);
    }

    @Test
    void testFaqCrudLifecycle() {
        // 1. Create FAQs
        CreateFaqRequest faq1 = new CreateFaqRequest(
                "AUTHENTICITY",
                "How does REVERIE verify the provenance of timepieces?",
                "Every timepiece undergoes a multi-point inspection by certified master horologists with archival brand extract verification.",
                1,
                true
        );
        CreateFaqRequest faq2 = new CreateFaqRequest(
                "SHIPPING",
                "How are high-value timepieces transported?",
                "All timepieces are transported via armored, insured courier transit with dual authentication upon delivery.",
                2,
                true
        );

        FaqDto created1 = contentService.createFaq(faq1, editorAdmin.getId());
        FaqDto created2 = contentService.createFaq(faq2, editorAdmin.getId());

        assertNotNull(created1.getId());
        assertNotNull(created2.getId());

        // 2. Query published FAQs
        List<FaqDto> allFaqs = contentService.getAllPublishedFaqs();
        assertEquals(2, allFaqs.size());

        List<FaqDto> authFaqs = contentService.getFaqsByCategory("AUTHENTICITY");
        assertEquals(1, authFaqs.size());
        assertEquals("AUTHENTICITY", authFaqs.get(0).getCategory());

        // 3. Delete FAQ
        contentService.deleteFaq(created1.getId(), editorAdmin.getId());
        assertEquals(1, contentService.getAllPublishedFaqs().size());
    }

    @Test
    void testBrandStoryEditorialPublishAndRetrieve() {
        CreateBrandStoryRequest storyReq = new CreateBrandStoryRequest(
                "the-art-of-grand-complications",
                "The Art of Grand Complications: From Vallée de Joux to Eternity",
                "An exploration into the centuries of craftsmanship behind minute repeaters and perpetual calendars.",
                "In the mist-shrouded valleys of the Swiss Jura, horological masters have perfected mechanical artistry...",
                "https://cdn.reverie.luxury/stories/grand-complications.jpg",
                "Master Horologist Philippe Dufour",
                true
        );

        BrandStoryDto story = contentService.createOrUpdateStory(storyReq, editorAdmin.getId());
        assertNotNull(story.getId());
        assertEquals("the-art-of-grand-complications", story.getSlug());

        // Query story by slug
        BrandStoryDto retrieved = contentService.getStoryBySlug("the-art-of-grand-complications");
        assertEquals(story.getTitle(), retrieved.getTitle());

        // Query story list
        Page<BrandStoryDto> storiesPage = contentService.getPublishedStories(PageRequest.of(0, 10));
        assertEquals(1, storiesPage.getTotalElements());
    }
}
