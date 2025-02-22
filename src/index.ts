import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { MCPServices } from './services/service';

import { get } from "http";
import { z } from "zod";
import { DeliveriesInJourneyClarified, DeliveriesInJourneyResponse, IncidentOwnerTeamFeatureAlert, IncidentOwnerTeamResponse} from "./models/models";

const JOURNEY_API_BASE = "http://localhost:8080";
const INCIDENT_TEAM_API_BASE = "http://localhost:8080";
  
const server = new McpServer({
  name: "mock-delivery-support-assistant",
  version: "1.0.0",
});

const mcpServices = new MCPServices();
server.tool(
    "get-deliveries-in-journey",
    "Get deliveries count in a journey",
    {
      journeyKey: z.string().length(9).describe("a string of 9 characters, the first two characters are letters and the other 7 characters are numbers (e.g. SF2027019)"),
    },
    async ({ journeyKey }) => {
      const journeyId = journeyKey.toUpperCase();
      const deliveriesInJourneyUrl = `${JOURNEY_API_BASE}/journey/${journeyId}/deliveries`;
      const deliveriesInJourneyDataResponse = await mcpServices.getRequest<DeliveriesInJourneyResponse>(deliveriesInJourneyUrl);
  
      if (!deliveriesInJourneyDataResponse) {
        return {
          content: [
            {
              type: "text",
              text: "Failed to retrieve alerts get-deliveries-in-journey data",
            },
          ],
        };
      }
  
      const features = deliveriesInJourneyDataResponse.features || [];
      if (features.length === 0) {
        return {
          content: [
            {
              type: "text",
              text: `No active journey for ${journeyId}`,
            },
          ],
        };
      }
  
      const formattedDeliveriesInJourney = features.map(DeliveriesInJourneyClarified);
      const deliveriesInJourneyData = `Active journey for ${journeyId}:\n\n${formattedDeliveriesInJourney.join("\n")}`;
  
      return {
        content: [
          {
            type: "text",
            text: deliveriesInJourneyData,
          },
        ],
      };
    },
  );

  server.tool(
    "get-incident-owner-team",
    "finds which team and project is responsible for the support according to the words it contains",
    {
      text: z.string().describe("text to search for team and project"),
    },
    async ({ text }) => {
      const incidentTeamSemanticSearchService = `${INCIDENT_TEAM_API_BASE}/incident/team?text=${encodeURIComponent(text)}`;
      const incidentOwnerTeamDataResponse = await mcpServices.getRequest<IncidentOwnerTeamResponse>(incidentTeamSemanticSearchService);

      if (!incidentOwnerTeamDataResponse) {
        return {
          content: [
            {
              type: "text",
              text: "Failed to retrieve incidentOwnerTeam data",
            },
          ],
        };
      }
  
      const features = incidentOwnerTeamDataResponse.features || [];
      if (features.length === 0) {
        return {
          content: [
            {
              type: "text",
              text: `No active data for incidentOwner`,
            },
          ],
        };
      }
  
      const formattedIncidentOwnerTeamData = features.map(IncidentOwnerTeamFeatureAlert);
      const incidentOwnerTeamData = `incident owner team for:\n\n${formattedIncidentOwnerTeamData.join("\n")}`;
  
      return {
        content: [
          {
            type: "text",
            text: incidentOwnerTeamData,
          },
        ],
      };
    },
  );


  async function main() {
    const transport = new StdioServerTransport();
    await server.connect(transport);
  }
  
  main().catch((error) => {
    console.error("Fatal error in main():", error);
    process.exit(1);
  });
