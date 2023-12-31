import { ExtensionProperty, IProperty, Nullable, PropertyType, Texture, TextureInfo, vec3, vec4 } from '@gltf-transform/core';
import { KHR_MATERIALS_PBR_SPECULAR_GLOSSINESS } from '../constants.js';
interface IPBRSpecularGlossiness extends IProperty {
    diffuseFactor: vec4;
    diffuseTexture: Texture;
    diffuseTextureInfo: TextureInfo;
    specularFactor: vec3;
    glossinessFactor: number;
    specularGlossinessTexture: Texture;
    specularGlossinessTextureInfo: TextureInfo;
}
/**
 * Converts a {@link Material} to a spec/gloss workflow. See {@link KHRMaterialsPBRSpecularGlossiness}.
 */
export declare class PBRSpecularGlossiness extends ExtensionProperty<IPBRSpecularGlossiness> {
    static EXTENSION_NAME: string;
    extensionName: typeof KHR_MATERIALS_PBR_SPECULAR_GLOSSINESS;
    propertyType: 'PBRSpecularGlossiness';
    parentTypes: [PropertyType.MATERIAL];
    protected init(): void;
    protected getDefaults(): Nullable<IPBRSpecularGlossiness>;
    /**********************************************************************************************
     * Diffuse.
     */
    /** Diffuse; Linear-sRGB components. See {@link PBRSpecularGlossiness.getDiffuseTexture getDiffuseTexture}. */
    getDiffuseFactor(): vec4;
    /** Diffuse; Linear-sRGB components. See {@link PBRSpecularGlossiness.getDiffuseTexture getDiffuseTexture}. */
    setDiffuseFactor(factor: vec4): this;
    /** Diffuse; sRGB hexadecimal color. */
    getDiffuseHex(): number;
    /** Diffuse; sRGB hexadecimal color. */
    setDiffuseHex(hex: number): this;
    /**
     * Diffuse texture; sRGB. Alternative to baseColorTexture, used within the
     * spec/gloss PBR workflow.
     */
    getDiffuseTexture(): Texture | null;
    /**
     * Settings affecting the material's use of its diffuse texture. If no texture is attached,
     * {@link TextureInfo} is `null`.
     */
    getDiffuseTextureInfo(): TextureInfo | null;
    /** Sets diffuse texture. See {@link PBRSpecularGlossiness.getDiffuseTexture getDiffuseTexture}. */
    setDiffuseTexture(texture: Texture | null): this;
    /**********************************************************************************************
     * Specular.
     */
    /** Specular; linear multiplier. */
    getSpecularFactor(): vec3;
    /** Specular; linear multiplier. */
    setSpecularFactor(factor: vec3): this;
    /**********************************************************************************************
     * Glossiness.
     */
    /** Glossiness; linear multiplier. */
    getGlossinessFactor(): number;
    /** Glossiness; linear multiplier. */
    setGlossinessFactor(factor: number): this;
    /**********************************************************************************************
     * Specular/Glossiness.
     */
    /** Spec/gloss texture; linear multiplier. */
    getSpecularGlossinessTexture(): Texture | null;
    /**
     * Settings affecting the material's use of its spec/gloss texture. If no texture is attached,
     * {@link TextureInfo} is `null`.
     */
    getSpecularGlossinessTextureInfo(): TextureInfo | null;
    /** Spec/gloss texture; linear multiplier. */
    setSpecularGlossinessTexture(texture: Texture | null): this;
}
export {};
