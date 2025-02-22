
export interface DeliveriesInJourneyFeature {
    properties: {
      route?: string;
      deliveryCount?: number;
      bagCount?: number;
      deliveriesInBagCount?: number;
      totalDeliveryCount?: number;
    };
  }
  
   export function DeliveriesInJourneyClarified(feature: DeliveriesInJourneyFeature): string {
    const props = feature.properties;
    return [
      `Route: ${props.route || "Unknown"}`,
      `DeliveryCount: ${props.deliveryCount || null}`,
      `BagCount: ${props.bagCount || null}`,
      `DeliveriesInBagCount: ${props.deliveriesInBagCount || null}`,
      `TeadtotalDeliveryCountline: ${props.totalDeliveryCount || "No headline"}`,
      "---",
    ].join("\n");
  }
  
  
    export interface DeliveriesInJourneyResponse {
    features: DeliveriesInJourneyFeature[];
  }
  
  
   export interface IncidentOwnerTeamFeature {
    properties: {
      words?: Array<String>;
      description?: string;
      incidentOwnerTeam?: string;
  
    };
  
  }
  
   export function IncidentOwnerTeamFeatureAlert(feature: IncidentOwnerTeamFeature): string {
    const props = feature.properties;
    return [
      `Words: ${props.words || ["Unknown"]}`,
      `Description: ${props.description || "Unknown"}`,
      `IncidentOwnerTeam: ${props.incidentOwnerTeam || "Unknown"}`,
      "---",
    ].join("\n");
  }
  
  
    export interface IncidentOwnerTeamResponse {
    features: IncidentOwnerTeamFeature[];
  }