
export const settingsSchema = {
  title: "Settings",
  description: "",
  type: "object",
  sections: [
    {
      name: "Tenant Info",
      fields: [
        {
          name: "id",
          type: "textfield",
          dataType: "string",
          label: "ID",
          disabled: true,
          mask: false,
        },
        {
          name: "customername",
          type: "textfield",
          dataType: "string",
          label: "Customer Name",
          disabled: true,
          mask: false,
        },
      ],
    },

  ],
}
