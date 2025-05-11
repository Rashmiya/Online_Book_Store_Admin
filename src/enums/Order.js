export const ORDER_STATUS = {
  pending: {
    label: "PENDING",
    color: "text-[#DE9508]",
    bgColor: "bg-[#FFEFC5]",
    borderColor: "border-[#FFEFC5]",
  },
  processing: {
    label: "PROCESSING",
    color: "text-[#0D7CFF]",
    bgColor: "bg-[#D2F3FF]",
    borderColor: "border-[#D2F3FF]",
  },
  shipped: {
    label: "SHIPPED",
    color: "text-[#16AB13]",
    bgColor: "bg-[#DAF5B7]",
    borderColor: "border-[#DAF5B7]",
  },
  delivered: {
    label: "DELIVERED",
    color: "text-[#0D7CFF]",
    bgColor: "bg-[#D2F3FF]",
    borderColor: "border-[#D2F3FF]",
  },
  cancelled: {
    label: "CANCELLED",
    color: "text-[#B43016]",
    bgColor: "bg-[#FFE2E2]",
    borderColor: "border-[#FFE2E2]",
  },
};
["pending", "processing", "shipped", "delivered", "cancelled"];