export interface clientDataI{
  success: boolean;
  code: string;
  message: string;
  data: dataI
}

export interface clientDetailI{
  success: boolean;
  code: string;
  message: string;
  data: clientI
}

interface dataI{
    pageInfo?: { hasNextPage: boolean; nextCursor: null };
    result?: clientI[]
  }

export interface clientI{
  id: string;
  fullname: string;
  email: string;
  phone: string;
  companyName: string;
  billingAddress: string;
  totalPurchasedItems?: number;
  totalPaidInvoices?: number;
  totalOverdueInvoices?: number;
  totalPendingInvoices?: number;
  clientType: 'INDIVIDUAL' | 'ORGANIZATION',
  invoices:[]
}

export interface invoiceI{
  id: string;
  invoiceNo: string;
  description: string;
  totalAmount: number;
  status: string; 
  issuedAt: string;
  dueDate: string;
  issuedTo: string;
}

export interface itemsI{
  item: string;
  quantity: number;
  unitPrice: number;
}