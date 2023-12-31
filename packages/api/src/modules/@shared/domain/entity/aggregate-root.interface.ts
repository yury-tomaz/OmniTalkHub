export default interface AggregateRoot {
    toPrimitives(): Record<string, unknown>;
}