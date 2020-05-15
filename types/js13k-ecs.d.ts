declare module "js13k-ecs" {
    /** Component of the ECS */
    export class Component {
        constructor(...args: any[])
    }

    /** System of the ECS */
    export class System {
        /** Method called by `ecs.update(delta)` */
        update(delta: number): void
    }

    /** Entity of the ECS, created by calling `ecs.create` */
    export class Entity {
        constructor(id: any)
        /**
         * Adds the components to the entity.
         */
        add(...components: Component[]): void;
        /**
         * Removes components of the Components class from the entity.
         * Calls the destructor method of each component if it is present.
         */
        remove(...components: Component[]): void;
        /**
         * Returns true if the entity has a component of the Component class and false otherwise.
         */
        has(component: typeof Component): boolean;
        /**
         * Returns a component of the Component class or undefined if it is not present.
         */
        get<T extends Component>(component: (new (...args: any[]) => T)): T | undefined;
        /**
         * Removes the entity from all selectors and sets its id to zero. Calls the destructor method of each component if it is present.
         */
        eject(): void;
    }

    export type EntityCallbackFn = (entity: Entity) => void
    /**
     * Selection of entities matching containing a list of desired components.
     * Created by calling `ecs.select`
     */
    export class Selector {
        /** Call the callback function on each selected entity
         * @param callback Function to call for each entity
         */
        iterate(callback: EntityCallbackFn): void
        /**
         * If entity matches the selection mask, add it to the selection list otherwise remove it.
         * @param entity Entity to check against the selection mask
         */
        match(entity: Entity): void
        /**
         * Insert specified entity at the beginning of the selection list.
         * Does nothing if entity is already selected.
         * @param entity Entity to add to the selection
         */
        add(entity: Entity): void
        /**
         * Remove specified entity from the selection.
         * Does nothing if the entity is not selected.
         * @param entity Entity to remove from the selection
         */
        remove(entity: Entity): void
    }

    /** Object containing the duration of execution for each system */
    export interface SystemExecutionDuration
    {
        /** Duration of the execution of this system */
        [SystemName: string]: number
    }

    /**
     * Registers components for use by the library.
     * Note that due to the way component masks are currently created (using bit operations) there is a limit of 32 registered components.
     * Does nothing if component is already registered
     */
    export function register(...components: (typeof Component)[]): void
    /**
     * Adds systems for use by the library.
     */
    export function process(...system: System[]): void
    /**
     * Creates the entity with the specified id.
     * If id is not specified, serial numbers starting with 1 are generated and encoded in base36.
     * @returns the created entity.
     */
    export function create(id?: any): Entity
    /**
     * Returns the entity with the specified id or undefined if it is not present.
     * @returns Entity with specified id or undefined.
     */
    export function get(id?: any): Entity | undefined
    /**
     * Returns a selection of entities that have the specified set of components.
     * Note if a similar Selector already exists (i.e. as Selector with the same list of Components), it is returned instead of creating a new one.
     * @param Components Component types used to filter the entities
     * @returns Selection of entities that have the specified set of components, the selection is updated real-time and always relevant
     */
    export function select(...Components: (typeof Component)[]): Selector
    /**
     * Successively calls update methods on all systems, passing them the delta parameter.
     * @param delta Time elapsed since last update call, passed to System.update
     * @returns Object containing the duration of execution for each system
     */
    export function update(delta: number): SystemExecutionDuration
}
