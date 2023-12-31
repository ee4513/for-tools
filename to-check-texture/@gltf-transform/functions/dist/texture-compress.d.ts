import { Texture, Transform, vec2 } from '@gltf-transform/core';
import { TextureResizeFilter } from './texture-resize.js';
type Format = (typeof FORMATS)[number];
declare const FORMATS: readonly ["jpeg", "png", "webp", "avif"];
export interface TextureCompressOptions {
    /** Instance of the Sharp encoder, which must be installed from the
     * 'sharp' package and provided by the caller. When not provided, a
     * platform-specific fallback implementation will be used, and most
     * quality- and compression-related options are ignored.
     */
    encoder?: unknown;
    /**
     * Target image format. If specified, included textures in other formats
     * will be converted. Default: original format.
     */
    targetFormat?: Format;
    /**
     * Resizes textures to given maximum width/height, preserving aspect ratio.
     * For example, a 4096x8192 texture, resized with limit [2048, 2048] will
     * be reduced to 1024x2048.
     */
    resize?: vec2;
    /** Interpolation used if resizing. Default: TextureResizeFilter.LANCZOS3. */
    resizeFilter?: TextureResizeFilter;
    /** Pattern identifying textures to compress, matched to name or URI. */
    pattern?: RegExp | null;
    /** Pattern matching the format(s) to be compressed or converted. */
    formats?: RegExp | null;
    /** Pattern matching the material texture slot(s) to be compressed or converted. */
    slots?: RegExp | null;
    /** Quality, 1-100. Default: auto. */
    quality?: number | null;
    /**
     * Level of CPU effort to reduce file size, 0-100. PNG, WebP, and AVIF
     * only. Supported only when a Sharp encoder is provided. Default: auto.
     */
    effort?: number | null;
    /**
     * Use lossless compression mode. WebP and AVIF only. Supported only when a
     * Sharp encoder is provided. Default: false.
     */
    lossless?: boolean;
    /**
     * Use near lossless compression mode. WebP only. Supported only when a
     * Sharp encoder is provided. Default: false.
     */
    nearLossless?: boolean;
}
export type CompressTextureOptions = Omit<TextureCompressOptions, 'pattern' | 'formats' | 'slots'>;
export declare const TEXTURE_COMPRESS_DEFAULTS: Omit<TextureCompressOptions, 'resize' | 'targetFormat' | 'encoder'>;
/**
 * Optimizes images, optionally resizing or converting to JPEG, PNG, WebP, or AVIF formats.
 *
 * For best results use a Node.js environment, install the `sharp` module, and
 * provide an encoder. When the encoder is omitted — `sharp` works only in Node.js —
 * the implementation will use a platform-specific fallback encoder, and most
 * quality- and compression-related options are ignored.
 *
 * Example:
 *
 * ```javascript
 * import { textureCompress } from '@gltf-transform/functions';
 * import sharp from 'sharp';
 *
 * // (A) Optimize without conversion.
 * await document.transform(
 * 	textureCompress({encoder: sharp})
 * );
 *
 * // (B) Optimize and convert images to WebP.
 * await document.transform(
 * 	textureCompress({
 * 		encoder: sharp,
 * 		targetFormat: 'webp',
 * 		slots: /^(?!normalTexture).*$/ // exclude normal maps
 * 	})
 * );
 *
 * // (C) Resize and convert images to WebP in a browser, without a Sharp
 * // encoder. Most quality- and compression-related options are ignored.
 * await document.transform(
 * 	textureCompress({ targetFormat: 'webp', resize: [1024, 1024] })
 * );
 * ```
 *
 * @category Transforms
 */
export declare function textureCompress(_options: TextureCompressOptions): Transform;
/**
 * Optimizes a single {@link Texture}, optionally resizing or converting to JPEG, PNG, WebP, or AVIF formats.
 *
 * For best results use a Node.js environment, install the `sharp` module, and
 * provide an encoder. When the encoder is omitted — `sharp` works only in Node.js —
 * the implementation will use a platform-specific fallback encoder, and most
 * quality- and compression-related options are ignored.
 *
 * Example:
 *
 * ```javascript
 * import { compressTexture } from '@gltf-transform/functions';
 * import sharp from 'sharp';
 *
 * const texture = document.getRoot().listTextures()
 * 	.find((texture) => texture.getName() === 'MyTexture');
 *
 * // (A) Node.js.
 * await compressTexture(texture, {
 * 	encoder: sharp,
 * 	targetFormat: 'webp',
 * 	resize: [1024, 1024]
 * });
 *
 * // (B) Web.
 * await compressTexture(texture, {
 * 	targetFormat: 'webp',
 * 	resize: [1024, 1024]
 * });
 * ```
 */
export declare function compressTexture(texture: Texture, _options: CompressTextureOptions): Promise<void>;
export {};
