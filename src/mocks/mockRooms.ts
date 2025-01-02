import { Classroom } from "../interfaces/AdmInterfaces";

const mockRooms: Classroom[] = [
    { room_id: 1, bloco: "A", identificacao: "Sala 101", tamanho: "50m²", tipo: "Laboratório" },
    { room_id: 2, bloco: "B", identificacao: "Sala 202", tamanho: "30m²", tipo: "Auditório" },
    { room_id: 3, bloco: "C", identificacao: "Sala 303", tamanho: "40m²", tipo: "Sala de Aula" },
    { room_id: 4, bloco: "D", identificacao: "Sala 404", tamanho: "35m²", tipo: "Laboratório" },
  ];

  export default mockRooms;