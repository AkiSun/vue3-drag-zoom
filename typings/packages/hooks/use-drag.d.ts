import { MaybeComputedRef, MaybeRef, Transform } from '../types';
export interface UseDragOption {
    triggerElement?: MaybeRef<HTMLElement | undefined>;
    parentTransform?: Transform;
    dragButton?: 0 | 1 | 2;
    dragHandleClass?: string;
    dragPreventClass?: string;
    boundary?: {
        minX?: number;
        maxX?: number;
        minY?: number;
        maxY?: number;
    };
    onDragStart?: {
        (event: MouseEvent | TouchEvent): void | false;
    };
    onDragMove?: {
        (newTransform: Transform, event: MouseEvent | TouchEvent): void;
    };
    onDragEnd?: {
        (event: MouseEvent | TouchEvent): void;
    };
}
export declare function useDrag(el: MaybeRef<HTMLElement | undefined>, transformProps: MaybeComputedRef<Transform>, option?: UseDragOption): {
    triggerElement: MaybeRef<HTMLElement | undefined>;
    parentTransform: Transform | undefined;
    isDragging: import("vue").Ref<boolean>;
    style: import("vue").ComputedRef<{
        transform: string;
    }>;
} | undefined;
