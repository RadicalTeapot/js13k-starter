declare module "js13k-ecs" {
    export class Component {
        constructor(...args: any[])
    }

    export class System {
        /** Method called by `ecs.update(delta)` */
        update(delta: number): void
    }

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

    export class Selector {
        constructor(mask: any)
        iterate(callback: (entity: Entity) => void): void
    }
    /**
     * Registers components for use by the library.
     * Note that there is currently a limit of 32 registered components.
    */
    export function register(...components: (typeof Component)[]): void;
    /**
     * Adds systems for use by the library.
    */
    export function process(...system: System[]): void;
    /**
     * Creates the entity with the specified id.
     * If id is not specified, serial numbers starting with 1 are generated and encoded in base36.
     * Returns the created entity.
    */
    export function create(id?: any): Entity;
    /**
     * Returns the entity with the specified id or undefined if it is not present.
     */
    export function get(id?: any): Entity | undefined;
    /**
     * Returns a selection of entities that have the specified set of components. The sample is updated real-time and always relevant.
     */
    export function select(...Components: (typeof Component)[]): Selector;
    /**
     * Successively calls update methods on all systems, passing them the delta parameter.
     * Returns the object that contains the duration of the execution of the systems.
     */
    export function update(delta: number): {[systemName: string]: number};
}
