export interface IWrite<T> {
    create(item: T): Promise< any>;
    update(id: string, item: T): Promise< any>;
    delete(id: string): Promise< any>;
}