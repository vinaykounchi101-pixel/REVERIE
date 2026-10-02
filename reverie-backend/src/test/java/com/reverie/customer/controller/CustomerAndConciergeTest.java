package com.reverie.customer.controller;

import com.reverie.catalog.entity.Product;
import com.reverie.catalog.entity.ProductStatus;
import com.reverie.catalog.repository.ProductRepository;
import com.reverie.customer.dto.*;
import com.reverie.customer.entity.AppointmentStatus;
import com.reverie.customer.entity.ReviewStatus;
import com.reverie.customer.service.ConciergeService;
import com.reverie.customer.service.CustomerAddressService;
import com.reverie.customer.service.ProductReviewService;
import com.reverie.testutil.TestDataCleaner;
import com.reverie.user.entity.Role;
import com.reverie.user.entity.User;
import com.reverie.user.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@ActiveProfiles("test")
public class CustomerAndConciergeTest {

    @Autowired
    private CustomerAddressService addressService;

    @Autowired
    private ProductReviewService reviewService;

    @Autowired
    private ConciergeService conciergeService;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private TestDataCleaner testDataCleaner;

    private User client;
    private User admin;
    private Product product;

    @BeforeEach
    void setUp() {
        testDataCleaner.cleanAll();

        client = new User();
        client.setEmail("lady.catherine@reverie.app");
        client.setPasswordHash("hashed_pass");
        client.setFirstName("Catherine");
        client.setLastName("Pendleton");
        client.setRole(Role.CUSTOMER);
        client.setVerified(true);
        client = userRepository.save(client);

        admin = new User();
        admin.setEmail("concierge.lead@reverie.app");
        admin.setPasswordHash("hashed_pass");
        admin.setFirstName("Arthur");
        admin.setLastName("Pendelton");
        admin.setRole(Role.ADMIN);
        admin.setVerified(true);
        admin = userRepository.save(admin);

        product = new Product();
        product.setName("Legacy Perpetual Calendar");
        product.setSlug("legacy-perpetual-calendar");
        product.setReferenceNumber("LPC-770");
        product.setGender("Unisex");
        product.setBasePricePaise(320000000L); // ₹32,00,000
        product.setStatus(ProductStatus.PUBLISHED);
        product = productRepository.save(product);
    }

    @Test
    void testAddressBookCrudAndDefaultSwitch() {
        // 1. Add primary address
        CreateAddressRequest req1 = new CreateAddressRequest(
                "Catherine Pendleton",
                "9876543210",
                "Penthouse 4, Kensington Tower",
                "Worli Sea Face",
                "Mumbai",
                "Maharashtra",
                "400018",
                "India",
                true
        );
        CustomerAddressDto addr1 = addressService.addAddress(client.getId(), req1);
        assertTrue(addr1.isDefault());

        // 2. Add second address as non-default
        CreateAddressRequest req2 = new CreateAddressRequest(
                "Catherine Pendleton",
                "9876543210",
                "Country Estate",
                null,
                "Alibaug",
                "Maharashtra",
                "402201",
                "India",
                false
        );
        CustomerAddressDto addr2 = addressService.addAddress(client.getId(), req2);
        assertFalse(addr2.isDefault());

        List<CustomerAddressDto> list = addressService.getAddresses(client.getId());
        assertEquals(2, list.size());

        // 3. Update addr2 to be default -> addr1 should no longer be default
        req2.setDefault(true);
        addr2 = addressService.updateAddress(addr2.getId(), client.getId(), req2);
        assertTrue(addr2.isDefault());

        list = addressService.getAddresses(client.getId());
        for (CustomerAddressDto a : list) {
            if (a.getId().equals(addr1.getId())) {
                assertFalse(a.isDefault());
            } else if (a.getId().equals(addr2.getId())) {
                assertTrue(a.isDefault());
            }
        }

        // 4. Delete address
        addressService.deleteAddress(addr1.getId(), client.getId());
        assertEquals(1, addressService.getAddresses(client.getId()).size());
    }

    @Test
    void testProductReviewLifecycle_SubmissionAndModeration() {
        CreateReviewRequest req = new CreateReviewRequest(
                product.getId(),
                null,
                5,
                "Unsurpassed Horological Masterpiece",
                "The finishing of the movement bridge and the enamel dial depth is beyond comparison."
        );

        ProductReviewDto review = reviewService.submitReview(client.getId(), req);
        assertNotNull(review.getId());
        assertEquals(ReviewStatus.PENDING, review.getStatus());

        // Approved reviews for product should initially be empty
        List<ProductReviewDto> approvedList = reviewService.getApprovedReviewsForProduct(product.getId());
        assertTrue(approvedList.isEmpty());

        // Admin moderates review
        ProductReviewDto moderated = reviewService.moderateReview(review.getId(), ReviewStatus.APPROVED, admin.getId());
        assertEquals(ReviewStatus.APPROVED, moderated.getStatus());

        // Now approved list contains the review
        approvedList = reviewService.getApprovedReviewsForProduct(product.getId());
        assertEquals(1, approvedList.size());
        assertEquals(5, approvedList.get(0).getRating());
    }

    @Test
    void testConciergeAppointment_BookingAndConfirmation() {
        BookAppointmentRequest req = new BookAppointmentRequest(
                "Catherine Pendleton",
                "lady.catherine@reverie.app",
                "9876543210",
                "PRIVATE_SUITE",
                Instant.now().plus(3, ChronoUnit.DAYS),
                "Requesting private viewing of Tourbillon and Minute Repeater collections with Champagne pairing."
        );

        ConciergeAppointmentDto appointment = conciergeService.bookAppointment(client.getId(), req);
        assertNotNull(appointment.getId());
        assertEquals(AppointmentStatus.REQUESTED, appointment.getStatus());
        assertEquals("PRIVATE_SUITE", appointment.getConsultationType());

        // Client views appointments
        List<ConciergeAppointmentDto> myAppts = conciergeService.getUserAppointments(client.getId());
        assertEquals(1, myAppts.size());

        // Admin confirms appointment
        ConciergeAppointmentDto updated = conciergeService.updateStatus(
                appointment.getId(),
                AppointmentStatus.CONFIRMED,
                "Private Suite B reserved, Horology Master Sommelier assigned",
                admin.getId()
        );

        assertEquals(AppointmentStatus.CONFIRMED, updated.getStatus());
        assertEquals("Private Suite B reserved, Horology Master Sommelier assigned", updated.getNotes());
    }
}
