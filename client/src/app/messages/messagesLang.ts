export interface Containers {
   name: string;
   label: string;
   icon: string;
}

export interface text {
   noMessage: string;
   for: string;
   from: string;
   sent: string;
   received: string;
   message: string;
   btn: string;
}
export const textEsp = {
   noMessage: 'Sin mensajes',
   for: 'Para',
   from: 'Desde',
   sent: 'Enviado',
   received: 'Recivido',
   message: 'Mensaje',
   btn: 'Borrar',
};
export const textEng = {
   noMessage: 'No new messages',
   for: 'For',
   from: 'From',
   sent: 'Sent',
   received: 'Received',
   message: 'Message',
   btn: 'Delete',
};

export const containersEsp: Containers[] = [
   { name: 'Unread', label: 'Nuevos', icon: 'pi pi-envelope mr-2' },
   { name: 'Inbox', label: 'Recibidos', icon: 'pi pi-folder-open mr-2' },
   { name: 'Outbox', label: 'Enviados', icon: 'pi pi-send mr-2' },
];

export const containersEng: Containers[] = [
   { name: 'Unread', label: 'Unread', icon: 'pi pi-envelope mr-2' },
   { name: 'Inbox', label: 'Inbox', icon: 'pi pi-folder-open mr-2' },
   { name: 'Outbox', label: 'Outbox', icon: 'pi pi-send mr-2' },
];
