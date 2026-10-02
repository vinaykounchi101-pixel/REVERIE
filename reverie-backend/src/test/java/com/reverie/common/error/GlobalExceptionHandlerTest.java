package com.reverie.common.error;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.annotation.Import;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
@WithMockUser
@Import(GlobalExceptionHandlerTest.TestErrorController.class)
public class GlobalExceptionHandlerTest {

    @RestController
    @RequestMapping("/api/test-errors")
    static class TestErrorController {

        @GetMapping("/out-of-stock")
        public void throwOutOfStock() {
            throw new BusinessException(ErrorCode.INV_OUT_OF_STOCK, "The selected watch is unavailable.");
        }

        @GetMapping("/not-found")
        public void throwNotFound() {
            throw new ResourceNotFoundException(ErrorCode.PRODUCT_NOT_FOUND, "Product with slug 'unknown' was not found");
        }
    }

    @Autowired
    private MockMvc mockMvc;

    @Test
    void shouldFormatBusinessExceptionAsRFC7807() throws Exception {
        mockMvc.perform(get("/api/test-errors/out-of-stock")
                        .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isConflict())
                .andExpect(jsonPath("$.type").value("https://reverie.app/errors/inv-out-of-stock"))
                .andExpect(jsonPath("$.code").value("INV_OUT_OF_STOCK"))
                .andExpect(jsonPath("$.status").value(409))
                .andExpect(jsonPath("$.detail").value("The selected watch is unavailable."))
                .andExpect(jsonPath("$.traceId").isNotEmpty());
    }

    @Test
    void shouldFormatNotFoundExceptionAsRFC7807() throws Exception {
        mockMvc.perform(get("/api/test-errors/not-found")
                        .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$.code").value("PRODUCT_NOT_FOUND"))
                .andExpect(jsonPath("$.status").value(404))
                .andExpect(jsonPath("$.detail").value("Product with slug 'unknown' was not found"));
    }
}
