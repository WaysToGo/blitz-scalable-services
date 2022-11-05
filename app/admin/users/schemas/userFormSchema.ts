import getRoles from "app/admin/roles/queries/getRoles"
import { AppConstants } from "app/core/constants/AppConstants"
import getUsers from "app/admin/users/queries/getUsers"

export const userFormSchema = {
  title: "New User",
  description: "User Schema",
  type: "object",
  sections: [
    {
      name: "User Information",
      fields: [
        {
          name: "name",
          type: "textfield",
          dataType: "string",
          label: "Name",
          required: true,
        },
        {
          name: "email",
          type: "textfield",
          dataType: "string",
          label: "Email",
          required: true,
        },
        {
          name: "phone",
          type: "textfield",
          dataType: "number",
          label: "Phone",
          required: false,
        },
        {
          name: "role",
          type: AppConstants.fieldTypes.dropdownWithDBSourceUnMerged,
          dataType: "string",
          key: "name",
          label: "Role",
          required: true,
          dataSource: getRoles,
          where: {},
          setValueKey: "name",
          getOptionLabel: (option) => option.name,
        },
        {
          name: "profile",
          type: AppConstants.fieldTypes.dropdownWithStaticData,
          key: "profile",
          dataType: "string",
          label: "Profile",
          required: true,
          dropdownData: AppConstants.profileValues,
          getOptionLabel: (option) => option,
        },
        {
          name: "manager",
          type: AppConstants.fieldTypes.searchUnmerged,
          dataType: "string",
          label: "Manager",
          required: false,
          dataSource: getUsers,
          where: {},
          getOptionLabel: (option) => option.name,
          getValueLabel: (option) => option?.id,
        },
      ],
    },
    {
      name: "Address",
      fields: [
        {
          name: "address",
          type: "textfield",
          dataType: "string",
          label: "Address",
          required: false,
        },
        {
          name: "city",
          type: "textfield",
          dataType: "string",
          label: "City",
          required: false,
        },
        {
          name: "stateorprovince",
          type: "textfield",
          dataType: "string",
          label: "State/Province",
          required: false,
        },
        {
          name: "country",
          type: "textfield",
          dataType: "string",
          label: "Country",
          required: false,
        },
        {
          name: "postalcode",
          type: "textfield",
          dataType: "string",
          label: "Zip/PostalCode",
          required: false,
        },
      ],
    },
    {
      name: "Additional Information",
      fields: [
        {
          name: "officephone",
          type: "textfield",
          dataType: "number",
          label: "Office Phone",
          required: false,
        },
        {
          name: "homephone",
          type: "textfield",
          dataType: "number",
          label: "Home Phone",
          required: false,
        },
        {
          name: "alternateemail",
          type: "textfield",
          dataType: "string",
          label: "Alternate Email",
          required: false,
        },
      ],
    },
  ],
}
