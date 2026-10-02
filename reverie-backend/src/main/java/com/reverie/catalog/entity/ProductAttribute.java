package com.reverie.catalog.entity;

import jakarta.persistence.*;
import java.util.UUID;

@Entity
@Table(name = "product_attributes")
public class ProductAttribute {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "product_id", nullable = false)
    private Product product;

    @Column(name = "case_diameter")
    private String caseDiameter;

    private String thickness;

    @Column(name = "case_material")
    private String caseMaterial;

    private String movement;

    @Column(name = "power_reserve")
    private String powerReserve;

    private String crystal;

    @Column(name = "water_resistance")
    private String waterResistance;

    @Column(name = "strap_width")
    private String strapWidth;

    private String complications;

    @Column(name = "dial_color")
    private String dialColor;

    private String origin = "Switzerland";

    @Column(name = "warranty_months", nullable = false)
    private int warrantyMonths = 24;

    public ProductAttribute() {}

    public UUID getId() { return id; }
    public void setId(UUID id) { this.id = id; }

    public Product getProduct() { return product; }
    public void setProduct(Product product) { this.product = product; }

    public String getCaseDiameter() { return caseDiameter; }
    public void setCaseDiameter(String caseDiameter) { this.caseDiameter = caseDiameter; }

    public String getThickness() { return thickness; }
    public void setThickness(String thickness) { this.thickness = thickness; }

    public String getCaseMaterial() { return caseMaterial; }
    public void setCaseMaterial(String caseMaterial) { this.caseMaterial = caseMaterial; }

    public String getMovement() { return movement; }
    public void setMovement(String movement) { this.movement = movement; }

    public String getPowerReserve() { return powerReserve; }
    public void setPowerReserve(String powerReserve) { this.powerReserve = powerReserve; }

    public String getCrystal() { return crystal; }
    public void setCrystal(String crystal) { this.crystal = crystal; }

    public String getWaterResistance() { return waterResistance; }
    public void setWaterResistance(String waterResistance) { this.waterResistance = waterResistance; }

    public String getStrapWidth() { return strapWidth; }
    public void setStrapWidth(String strapWidth) { this.strapWidth = strapWidth; }

    public String getComplications() { return complications; }
    public void setComplications(String complications) { this.complications = complications; }

    public String getDialColor() { return dialColor; }
    public void setDialColor(String dialColor) { this.dialColor = dialColor; }

    public String getOrigin() { return origin; }
    public void setOrigin(String origin) { this.origin = origin; }

    public int getWarrantyMonths() { return warrantyMonths; }
    public void setWarrantyMonths(int warrantyMonths) { this.warrantyMonths = warrantyMonths; }
}
