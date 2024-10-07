import request from "supertest";
import app from "../src/app"; // ajuste o caminho conforme necessário
//import { PrismaClient } from "@prisma/client";

//const prisma = new PrismaClient();

/*describe("Appointments API", () => {
  //let appointmentId: number;

  /*describe("POST /appointments", () => {
    it("should return 400 for invalid input", async () => {
      const response = await request(app).post("/appointments").send({
        // Dados inválidos ou incompletos
      });

      expect(response.status).toBe(400);
    });

    it("should create a new appointment with multiple services", async () => {
      const appointmentData = {
        dateTime: "2024-05-22T14:00:00Z",
        status: "confirmado",
        clientId: 1,
        services: [
          { serviceId: 1, professionalId: 1, price: 80.0 },
          { serviceId: 2, professionalId: 2, price: 60.0 },
        ],
      };

      const response = await request(app)
        .post("/appointments")
        .send(appointmentData);

      if (response.status !== 201) {
        console.error("Resposta do servidor:", response.body);
      }

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty("id");
      expect(response.body.totalPrice).toBe(140.0);
      expect(response.body.status).toBe("confirmado");
      expect(response.body.services).toHaveLength(2);
      expect(response.body.services[0]).toHaveProperty("serviceId", 1);
      expect(response.body.services[1]).toHaveProperty("serviceId", 2);
    });
  });*/

/*describe("GET /appointments", () => {
    it("should return a list of appointments", async () => {
      const response = await request(app).get("/appointments");

      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
    });
  });
});
*/

describe("GET /services", () => {
  it("should return 200 OK!", async () => {
    try {
      const response = await request(app).get("/services");

      console.log("Response status:", response.status);
      console.log("Response body:", response.body);

      expect(response.status).toBe(200);

      // Adicione mais expectativas para verificar o conteúdo da resposta
      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toBeGreaterThan(0);
    } catch (error) {
      console.error("Error in test:", error);
      throw error;
    }
  });
});

/*describe("GET /services/grouped", () => {
  it("should return 200 OK!", async () => {
    const response = await request(app).get("/services/grouped");

    expect(response.status).toBe(200);
  });
});

describe("GET /professionals", () => {
  it("should return 200 OK!", async () => {
    const response = await request(app).get("/professionals");
    console.log("Resposta do corpo:", response.body);
    console.log("Status da resposta:", response.status);
    if (response.status === 500) {
      console.error("Erro do servidor:", response.text);
    }
    expect(response.status).toBe(200);
  });
});

describe("GET /appointments/:ano/:mes/faturamento", () => {
  it("should return 200 OK!", async () => {
    const response = await request(app).get(
      "/appointments/2023/08/faturamento"
    );
    console.log("Resposta do corpo:", response.body);
    expect(response.status).toBe(200);
  });
});

describe("GET /appointments/:ano/:mes/faturamento/profissional", () => {
  it("should return 200 OK!", async () => {
    const response = await request(app).get(
      "/appointments/2023/08/faturamento/profissional"
    );
    console.log("Resposta do corpo:", response.body);
    expect(response.status).toBe(200);
  });
});
*/
