export const postNewJobSchema = {
  title: "New Job",
  description: "New Job",
  type: "object",
  sections: [
    {
      name: "Information",
      fields: [
        {
          name: "title",
          type: "textfield",
          dataType: "string",
          label: "Job title",
          required: true,
        },
        {
          name: "description",
          type: "textfield",
          dataType: "string",
          label: "Description",
          required: true,
        },
        {
          name: "experience",
          type: "number",
          dataType: "string",
          label: "Experience",
          required: true,
        },
        {
          name: "company",
          type: "textfield",
          dataType: "string",
          label: "Company",
          required: true,
        },
      ],
    },
  ],
}
