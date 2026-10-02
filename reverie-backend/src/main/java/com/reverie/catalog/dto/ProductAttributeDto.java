package com.reverie.catalog.dto;

import com.reverie.catalog.entity.ProductAttribute;

public class ProductAttributeDto {

    private String caseDiameter;
    private String thickness;
    private String caseMaterial;
    private String movement;
    private String powerReserve;
    private String crystal;
    private String waterResistance;
    private String strapWidth;
    private String complications;
    private String dialColor;
    private String origin;
    private int warrantyMonths;

    public ProductAttributeDto() {}

    public static ProductAttributeDto fromEntity(ProductAttribute attribute) {
        if (attribute == null) return null;
        ProductAttributeDto dto = new ProductAttributeDto();
        dto.setCaseDiameter(attribute.getCaseDiameter());
        dto.setThickness(attribute.getThickness());
        dto.setCaseMaterial(attribute.getCaseMaterial());
        dto.setMovement(attribute.getMovement());
        dto.setPowerReserve(attribute.getPowerReserve());
        dto.setCrystal(attribute.getCrystal());
        dto.setWaterResistance(attribute.getWaterResistance());
        dto.setStrapWidth(attribute.getStrapWidth());
        dto.setComplications(attribute.getComplications());
        dto.setDialColor(attribute.getDialColor());
        dto.setOrigin(attribute.getOrigin());
        dto.setWarrantyMonths(attribute.getWarrantyMonths());
        return dto;
    }

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
