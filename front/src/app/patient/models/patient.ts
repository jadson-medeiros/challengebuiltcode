export interface Patient {
  id: string,
  name: string,
  cpf: string,
  birthDate: string,
  doctorId: string,
  nameDoctor: string
}

export interface Doctor {
  id: string,
  name: string,
}
