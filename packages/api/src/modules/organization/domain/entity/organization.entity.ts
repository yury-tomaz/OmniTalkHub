import AggregateRoot from "@/modules/@shared/domain/entity/aggregate-root.interface";
import BaseEntity from "@/modules/@shared/domain/entity/base.entity";
import Id from "@/modules/@shared/domain/value-object/id.value-object";

interface OrganizationProps {
    id?: Id;
    realm: string;
    name: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export class Organization extends BaseEntity implements AggregateRoot{
    private _name: string;
    private readonly _realm: string;

    constructor(props: OrganizationProps) {
        super(props.id, props.createdAt, props.updatedAt);
        this._name = props.name;
        this._realm = props.realm;
    }

    get name(): string {
        return this._name;
    }

    get realm(): string {
        return this._realm;
    }

    changeName(name: string): void {
        this._name = name;
    }

    toPrimitives(): Record<string, unknown> {
        return {
            id: this.id.id,
            name: this.name,
            realm: this.realm,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt,
        }
    }
    
}