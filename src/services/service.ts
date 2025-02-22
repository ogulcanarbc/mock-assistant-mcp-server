const USER_AGENT = "mock-delivery-support-assistant";

export class MCPServices{

  async getRequest<T>(url: string): Promise<T | null> {
      const headers = {
        "User-Agent": USER_AGENT,
        Accept: "application/json",
      };
    
      try {
        const response = await fetch(url, {
          method: "GET",
          headers 
      });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return (await response.json()) as T;
      } catch (error) {
        console.error("Error making get request:", error);
        return null;
      }
    }

    async postRequest<T>(url: string): Promise<T | null> {
      const headers = {
        "User-Agent": USER_AGENT,
        Accept: "application/json",
      };
    
      try {
        const response = await fetch(url, {
          method: "POST",
          headers 
      });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return (await response.json()) as T;
      } catch (error) {
        console.error("Error making post request:", error);
        return null;
      }
    }


    async putRequest<T>(url: string): Promise<T | null> {
      const headers = {
        "User-Agent": USER_AGENT,
        Accept: "application/json",
      };
    
      try {
        const response = await fetch(url, {
          method: "PUT",
          headers 
      });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return (await response.json()) as T;
      } catch (error) {
        console.error("Error making put request:", error);
        return null;
      }
    }

}
