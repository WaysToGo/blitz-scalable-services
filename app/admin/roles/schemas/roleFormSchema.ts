export const roleFormSchema = {
  title: "New Role",
  description: "New Role",
  type: "object",
  sections: [
    {
      name: "Information",
      fields: [
        {
          name: "name",
          type: "textfield",
          dataType: "string",
          label: "Role Name",
          required: true,
        },
        {
          name: "description",
          type: "textfield",
          dataType: "string",
          label: "Description",
          required: true,
        },
      ],
    },
  ],
}
