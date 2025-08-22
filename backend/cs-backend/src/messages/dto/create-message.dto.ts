export class CreateMessageDto {
  content!: string;         // obligatorio
  sender_id!: string;       // llega como string; lo convertimos a BigInt
}
