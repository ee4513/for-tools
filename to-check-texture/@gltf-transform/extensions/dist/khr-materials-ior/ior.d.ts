import { ExtensionProperty, IProperty, Nullable, PropertyType } from '@gltf-transform/core';
import { KHR_MATERIALS_IOR } from '../constants.js';
interface IIOR extends IProperty {
    ior: number;
}
/**
 * Defines index of refraction for a PBR {@link Material}. See {@link KHRMaterialsIOR}.
 */
export declare class IOR extends ExtensionProperty<IIOR> {
    static EXTENSION_NAME: string;
    extensionName: typeof KHR_MATERIALS_IOR;
    propertyType: 'IOR';
    parentTypes: [PropertyType.MATERIAL];
    protected init(): void;
    protected getDefaults(): Nullable<IIOR>;
    /**********************************************************************************************
     * IOR.
     */
    /** IOR. */
    getIOR(): number;
    /** IOR. */
    setIOR(ior: number): this;
}
export {};
