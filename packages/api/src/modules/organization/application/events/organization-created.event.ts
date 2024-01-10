import EventInterface from "@/modules/@shared/domain/events/event.interface";

interface OrganizationCreatedEventData {
    realm: string;
    admin: {
        email: string;
        name: string;
        password: string;
    }
}

export class OrganizationCreatedEvent implements EventInterface{
 dateTimeOccurred: Date;
 eventData: OrganizationCreatedEventData;

 constructor(eventData: OrganizationCreatedEventData) {
  this.dateTimeOccurred = new Date();
  this.eventData = eventData;
 }
}