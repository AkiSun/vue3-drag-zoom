import { Transform, Range } from '../types';
export interface DragZoomContainerProps {
    modelValue: Transform;
    dragButton?: number;
    dragHandleClass?: string;
    dragPreventClass?: string;
    draggable?: boolean;
    zoomable?: boolean;
    zoomRange?: Range;
}
declare const _default: {
    new (...args: any[]): {
        $: import("vue").ComponentInternalInstance;
        $data: {};
        $props: Partial<{
            zoomRange: Range;
            draggable: boolean;
            zoomable: boolean;
        }> & Omit<Readonly<import("vue").ExtractPropTypes<__VLS_WithDefaults<__VLS_TypePropsToRuntimeProps<DragZoomContainerProps>, {
            draggable: boolean;
            zoomable: boolean;
            zoomRange: () => Range;
        }>>> & {
            onZoom?: ((newTransform: Transform, event: WheelEvent) => any) | undefined;
            onChange?: ((newTransform: Transform) => any) | undefined;
            "onDrag-start"?: ((event: MouseEvent | TouchEvent) => any) | undefined;
            "onDrag-move"?: ((newTransform: Transform, event: MouseEvent | TouchEvent) => any) | undefined;
            "onDrag-end"?: ((event: MouseEvent | TouchEvent) => any) | undefined;
            "onUpdate:modelValue"?: ((transform: Transform) => any) | undefined;
        } & import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, "zoomRange" | "draggable" | "zoomable">;
        $attrs: {
            [x: string]: unknown;
        };
        $refs: {
            [x: string]: unknown;
        };
        $slots: Readonly<{
            [name: string]: import("vue").Slot | undefined;
        }>;
        $root: import("vue").ComponentPublicInstance<{}, {}, {}, {}, {}, {}, {}, {}, false, import("vue").ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}, {}, string>, {}> | null;
        $parent: import("vue").ComponentPublicInstance<{}, {}, {}, {}, {}, {}, {}, {}, false, import("vue").ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}, {}, string>, {}> | null;
        $emit: ((event: "change", newTransform: Transform) => void) & ((event: "drag-start", event: MouseEvent | TouchEvent) => void) & ((event: "drag-move", newTransform: Transform, event: MouseEvent | TouchEvent) => void) & ((event: "drag-end", event: MouseEvent | TouchEvent) => void) & ((event: "zoom", newTransform: Transform, event: WheelEvent) => void) & ((event: "update:modelValue", transform: Transform) => void);
        $el: any;
        $options: import("vue").ComponentOptionsBase<Readonly<import("vue").ExtractPropTypes<__VLS_WithDefaults<__VLS_TypePropsToRuntimeProps<DragZoomContainerProps>, {
            draggable: boolean;
            zoomable: boolean;
            zoomRange: () => Range;
        }>>> & {
            onZoom?: ((newTransform: Transform, event: WheelEvent) => any) | undefined;
            onChange?: ((newTransform: Transform) => any) | undefined;
            "onDrag-start"?: ((event: MouseEvent | TouchEvent) => any) | undefined;
            "onDrag-move"?: ((newTransform: Transform, event: MouseEvent | TouchEvent) => any) | undefined;
            "onDrag-end"?: ((event: MouseEvent | TouchEvent) => any) | undefined;
            "onUpdate:modelValue"?: ((transform: Transform) => any) | undefined;
        }, {
            isDragging: any;
        }, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
            "drag-start": (event: MouseEvent | TouchEvent) => void;
        } & {
            "drag-move": (newTransform: Transform, event: MouseEvent | TouchEvent) => void;
        } & {
            "drag-end": (event: MouseEvent | TouchEvent) => void;
        } & {
            zoom: (newTransform: Transform, event: WheelEvent) => void;
        } & {
            change: (newTransform: Transform) => void;
        } & {
            "update:modelValue": (transform: Transform) => void;
        }, string, {
            zoomRange: Range;
            draggable: boolean;
            zoomable: boolean;
        }, {}, string> & {
            beforeCreate?: ((() => void) | (() => void)[]) | undefined;
            created?: ((() => void) | (() => void)[]) | undefined;
            beforeMount?: ((() => void) | (() => void)[]) | undefined;
            mounted?: ((() => void) | (() => void)[]) | undefined;
            beforeUpdate?: ((() => void) | (() => void)[]) | undefined;
            updated?: ((() => void) | (() => void)[]) | undefined;
            activated?: ((() => void) | (() => void)[]) | undefined;
            deactivated?: ((() => void) | (() => void)[]) | undefined;
            beforeDestroy?: ((() => void) | (() => void)[]) | undefined;
            beforeUnmount?: ((() => void) | (() => void)[]) | undefined;
            destroyed?: ((() => void) | (() => void)[]) | undefined;
            unmounted?: ((() => void) | (() => void)[]) | undefined;
            renderTracked?: (((e: import("vue").DebuggerEvent) => void) | ((e: import("vue").DebuggerEvent) => void)[]) | undefined;
            renderTriggered?: (((e: import("vue").DebuggerEvent) => void) | ((e: import("vue").DebuggerEvent) => void)[]) | undefined;
            errorCaptured?: (((err: unknown, instance: import("vue").ComponentPublicInstance<{}, {}, {}, {}, {}, {}, {}, {}, false, import("vue").ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}, {}, string>, {}> | null, info: string) => boolean | void) | ((err: unknown, instance: import("vue").ComponentPublicInstance<{}, {}, {}, {}, {}, {}, {}, {}, false, import("vue").ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}, {}, string>, {}> | null, info: string) => boolean | void)[]) | undefined;
        };
        $forceUpdate: () => void;
        $nextTick: typeof import("vue").nextTick;
        $watch<T extends string | ((...args: any) => any)>(source: T, cb: T extends (...args: any) => infer R ? (args_0: R, args_1: R) => any : (...args: any) => any, options?: import("vue").WatchOptions<boolean> | undefined): import("vue").WatchStopHandle;
    } & Readonly<import("vue").ExtractPropTypes<__VLS_WithDefaults<__VLS_TypePropsToRuntimeProps<DragZoomContainerProps>, {
        draggable: boolean;
        zoomable: boolean;
        zoomRange: () => Range;
    }>>> & {
        onZoom?: ((newTransform: Transform, event: WheelEvent) => any) | undefined;
        onChange?: ((newTransform: Transform) => any) | undefined;
        "onDrag-start"?: ((event: MouseEvent | TouchEvent) => any) | undefined;
        "onDrag-move"?: ((newTransform: Transform, event: MouseEvent | TouchEvent) => any) | undefined;
        "onDrag-end"?: ((event: MouseEvent | TouchEvent) => any) | undefined;
        "onUpdate:modelValue"?: ((transform: Transform) => any) | undefined;
    } & import("vue").ShallowUnwrapRef<{
        isDragging: any;
    }> & {} & import("vue").ComponentCustomProperties & {};
    __isFragment?: undefined;
    __isTeleport?: undefined;
    __isSuspense?: undefined;
} & import("vue").ComponentOptionsBase<Readonly<import("vue").ExtractPropTypes<__VLS_WithDefaults<__VLS_TypePropsToRuntimeProps<DragZoomContainerProps>, {
    draggable: boolean;
    zoomable: boolean;
    zoomRange: () => Range;
}>>> & {
    onZoom?: ((newTransform: Transform, event: WheelEvent) => any) | undefined;
    onChange?: ((newTransform: Transform) => any) | undefined;
    "onDrag-start"?: ((event: MouseEvent | TouchEvent) => any) | undefined;
    "onDrag-move"?: ((newTransform: Transform, event: MouseEvent | TouchEvent) => any) | undefined;
    "onDrag-end"?: ((event: MouseEvent | TouchEvent) => any) | undefined;
    "onUpdate:modelValue"?: ((transform: Transform) => any) | undefined;
}, {
    isDragging: any;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    "drag-start": (event: MouseEvent | TouchEvent) => void;
} & {
    "drag-move": (newTransform: Transform, event: MouseEvent | TouchEvent) => void;
} & {
    "drag-end": (event: MouseEvent | TouchEvent) => void;
} & {
    zoom: (newTransform: Transform, event: WheelEvent) => void;
} & {
    change: (newTransform: Transform) => void;
} & {
    "update:modelValue": (transform: Transform) => void;
}, string, {
    zoomRange: Range;
    draggable: boolean;
    zoomable: boolean;
}, {}, string> & import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps & (new () => {
    $slots: {
        fixed: (_: {}) => any;
        default: (_: {}) => any;
    };
});
export default _default;
declare type __VLS_NonUndefinedable<T> = T extends undefined ? never : T;
declare type __VLS_TypePropsToRuntimeProps<T> = {
    [K in keyof T]-?: {} extends Pick<T, K> ? {
        type: import('vue').PropType<__VLS_NonUndefinedable<T[K]>>;
    } : {
        type: import('vue').PropType<T[K]>;
        required: true;
    };
};
declare type __VLS_WithDefaults<P, D> = {
    [K in keyof Pick<P, keyof P>]: K extends keyof D ? P[K] & {
        default: D[K];
    } : P[K];
};
