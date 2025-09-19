export interface Agendamento {
  id?: number;
  dataHora: Date;
  cliente: string;
  funcionario: string;
  servico: string;
  status?: string;
}