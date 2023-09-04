export const userRoleExtract = async (role) => {
  switch (role) {
    case "Lab Member":
      return "Read";
      break;
    case "Lab Manager":
      return "Admin";
      break;
    case "Data Analyst":
      return "Admin";
      break;
    case "Data Scientist":
      return "Admin";
      break;
    case "Compliance Officer":
      return "Admin";
      break;
    case "Project Lead":
      return "Admin";
      break;
    case "Researcher":
      return "Admin";
      break;
    case "Scientist":
      return "Admin";
      break;
    case "IT Specialist":
      return "Admin";
      break;
    case "Safety Officer":
      return "Admin";
      break;
    case "Chemist":
      return "Write";
      break;
    case "Field Researcher":
      return "Write";
      break;
    case "Quality Control Officer":
      return "Admin";
      break;
    default:
      return role;
  }
};
