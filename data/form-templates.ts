import { FormField, FormStep } from "@/types/form";

export interface FormTemplate {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: "basic" | "business" | "feedback";
  fields: FormField[];
  steps: FormStep[];
  multiStepEnabled: boolean;
}

export const FORM_TEMPLATES: FormTemplate[] = [
  {
    id: "contact",
    name: "Contact Form",
    description: "Simple name, email, phone, and message form",
    icon: "Mail",
    category: "basic",
    multiStepEnabled: false,
    steps: [{ id: "step_1", title: "Step 1", fieldIds: [] }],
    fields: [
      { id: "t_heading", type: "heading", label: "Get in Touch", step: 0 },
      { id: "t_name", type: "text", label: "Full Name", placeholder: "John Doe", required: true, step: 0 },
      { id: "t_email", type: "email", label: "Email Address", placeholder: "john@example.com", required: true, step: 0, validation: [{ type: "email", message: "Please enter a valid email" }] },
      { id: "t_phone", type: "phone", label: "Phone Number", placeholder: "+1 (555) 000-0000", required: false, step: 0 },
      { id: "t_subject", type: "text", label: "Subject", placeholder: "How can we help?", required: false, step: 0 },
      { id: "t_sep", type: "separator", label: "Divider", step: 0 },
      { id: "t_message", type: "textarea", label: "Message", placeholder: "Tell us more...", required: true, step: 0, validation: [{ type: "min", value: 10, message: "Please write at least 10 characters" }] },
    ],
  },
  {
    id: "signup",
    name: "Sign Up",
    description: "Registration with website URL and terms",
    icon: "UserPlus",
    category: "basic",
    multiStepEnabled: false,
    steps: [{ id: "step_1", title: "Step 1", fieldIds: [] }],
    fields: [
      { id: "t_heading", type: "heading", label: "Create Your Account", step: 0 },
      { id: "t_fname", type: "text", label: "First Name", placeholder: "Jane", required: true, step: 0 },
      { id: "t_lname", type: "text", label: "Last Name", placeholder: "Smith", required: true, step: 0 },
      { id: "t_email", type: "email", label: "Email", placeholder: "jane@company.com", required: true, step: 0, validation: [{ type: "email", message: "Invalid email" }] },
      { id: "t_phone", type: "phone", label: "Phone", placeholder: "+1 (555) 000-0000", required: false, step: 0 },
      { id: "t_website", type: "url", label: "Website", placeholder: "https://yoursite.com", required: false, step: 0 },
      { id: "t_sep", type: "separator", label: "Divider", step: 0 },
      { id: "t_pass", type: "password", label: "Password", placeholder: "••••••••", required: true, step: 0, validation: [{ type: "min", value: 8, message: "Password must be at least 8 characters" }] },
      { id: "t_terms", type: "checkbox", label: "Terms", placeholder: "I agree to the Terms of Service", required: true, step: 0 },
    ],
  },
  {
    id: "survey",
    name: "Customer Survey",
    description: "Multi-step satisfaction survey with sliders & ratings",
    icon: "ClipboardList",
    category: "feedback",
    multiStepEnabled: true,
    steps: [
      { id: "step_1", title: "About You", fieldIds: [] },
      { id: "step_2", title: "Experience", fieldIds: [] },
      { id: "step_3", title: "Feedback", fieldIds: [] },
    ],
    fields: [
      { id: "t_heading_1", type: "heading", label: "Tell Us About Yourself", step: 0 },
      { id: "t_name", type: "text", label: "Your Name", placeholder: "Optional", required: false, step: 0 },
      { id: "t_role", type: "select", label: "Your Role", placeholder: "Select your role", required: true, step: 0, options: ["Developer", "Designer", "Manager", "Other"] },
      { id: "t_heading_2", type: "heading", label: "Rate Your Experience", step: 1 },
      { id: "t_rating", type: "radio", label: "How would you rate us?", required: true, step: 1, options: ["Excellent", "Good", "Average", "Poor"] },
      { id: "t_satisfaction", type: "slider", label: "Satisfaction Score", placeholder: "0-100", required: true, step: 1, validation: [{ type: "min", value: 0, message: "Min is 0" }, { type: "max", value: 100, message: "Max is 100" }] },
      { id: "t_recommend", type: "toggle", label: "Would Recommend", placeholder: "Would you recommend us to others?", step: 1 },
      { id: "t_sep", type: "separator", label: "Divider", step: 2 },
      { id: "t_feedback", type: "textarea", label: "Additional Feedback", placeholder: "What could we improve?", required: false, step: 2 },
      { id: "t_followup", type: "checkbox", label: "Follow Up", placeholder: "I'd like to be contacted about my feedback", step: 2 },
      { id: "t_followup_email", type: "email", label: "Contact Email", placeholder: "your@email.com", required: true, step: 2, condition: { fieldId: "t_followup", operator: "equals", value: "true" } },
    ],
  },
  {
    id: "job-application",
    name: "Job Application",
    description: "Multi-step application with phone, URL & resume",
    icon: "Briefcase",
    category: "business",
    multiStepEnabled: true,
    steps: [
      { id: "step_1", title: "Personal Info", fieldIds: [] },
      { id: "step_2", title: "Experience", fieldIds: [] },
    ],
    fields: [
      { id: "t_heading_1", type: "heading", label: "Personal Information", step: 0 },
      { id: "t_name", type: "text", label: "Full Name", placeholder: "Your full name", required: true, step: 0 },
      { id: "t_email", type: "email", label: "Email", placeholder: "your@email.com", required: true, step: 0, validation: [{ type: "email", message: "Valid email required" }] },
      { id: "t_phone", type: "phone", label: "Phone", placeholder: "+1 (555) 000-0000", required: true, step: 0 },
      { id: "t_portfolio", type: "url", label: "Portfolio / LinkedIn", placeholder: "https://linkedin.com/in/you", required: false, step: 0 },
      { id: "t_sep", type: "separator", label: "Divider", step: 1 },
      { id: "t_heading_2", type: "heading", label: "Professional Details", step: 1 },
      { id: "t_position", type: "select", label: "Position", placeholder: "Select position", required: true, step: 1, options: ["Frontend Engineer", "Backend Engineer", "Designer", "Product Manager"] },
      { id: "t_experience", type: "radio", label: "Years of Experience", required: true, step: 1, options: ["0-2", "3-5", "5-10", "10+"] },
      { id: "t_salary", type: "slider", label: "Expected Salary (k$)", placeholder: "50-200", step: 1, validation: [{ type: "min", value: 30, message: "Min 30k" }, { type: "max", value: 200, message: "Max 200k" }] },
      { id: "t_start", type: "date", label: "Earliest Start Date", required: false, step: 1 },
      { id: "t_resume", type: "file", label: "Resume", required: true, step: 1 },
      { id: "t_cover", type: "textarea", label: "Cover Letter", placeholder: "Why are you a great fit?", required: false, step: 1 },
    ],
  },
  {
    id: "event-rsvp",
    name: "Event RSVP",
    description: "Event registration with time, dietary, and guest count",
    icon: "CalendarCheck",
    category: "basic",
    multiStepEnabled: false,
    steps: [{ id: "step_1", title: "Step 1", fieldIds: [] }],
    fields: [
      { id: "t_heading", type: "heading", label: "Event Registration", step: 0 },
      { id: "t_name", type: "text", label: "Name", placeholder: "Your name", required: true, step: 0 },
      { id: "t_email", type: "email", label: "Email", placeholder: "you@email.com", required: true, step: 0 },
      { id: "t_phone", type: "phone", label: "Phone", placeholder: "+1 (555) 000-0000", required: false, step: 0 },
      { id: "t_sep", type: "separator", label: "Divider", step: 0 },
      { id: "t_guests", type: "number", label: "Number of Guests", placeholder: "1", required: true, step: 0, validation: [{ type: "min", value: 1, message: "At least 1 guest" }, { type: "max", value: 10, message: "Maximum 10 guests" }] },
      { id: "t_arrival", type: "time", label: "Preferred Arrival Time", required: false, step: 0 },
      { id: "t_dietary", type: "select", label: "Dietary Preference", placeholder: "Select...", options: ["No Preference", "Vegetarian", "Vegan", "Gluten-free"], step: 0 },
      { id: "t_color", type: "color", label: "Table Color Preference", step: 0 },
      { id: "t_notes", type: "textarea", label: "Special Requests", placeholder: "Anything else we should know?", step: 0 },
    ],
  },
  {
    id: "bug-report",
    name: "Bug Report",
    description: "Issue reporting with severity slider and URL",
    icon: "Bug",
    category: "feedback",
    multiStepEnabled: false,
    steps: [{ id: "step_1", title: "Step 1", fieldIds: [] }],
    fields: [
      { id: "t_heading", type: "heading", label: "Report a Bug", step: 0 },
      { id: "t_title", type: "text", label: "Bug Title", placeholder: "Short description", required: true, step: 0 },
      { id: "t_url", type: "url", label: "Page URL", placeholder: "https://app.example.com/page", required: false, step: 0 },
      { id: "t_severity", type: "radio", label: "Severity", required: true, step: 0, options: ["Critical", "High", "Medium", "Low"] },
      { id: "t_impact", type: "slider", label: "User Impact (0-100)", step: 0, validation: [{ type: "min", value: 0, message: "Min 0" }, { type: "max", value: 100, message: "Max 100" }] },
      { id: "t_sep", type: "separator", label: "Divider", step: 0 },
      { id: "t_steps", type: "textarea", label: "Steps to Reproduce", placeholder: "1. Go to...\n2. Click on...\n3. Observe...", required: true, step: 0, validation: [{ type: "min", value: 20, message: "Please provide detailed steps" }] },
      { id: "t_expected", type: "textarea", label: "Expected Behavior", placeholder: "What should happen?", required: true, step: 0 },
      { id: "t_screenshot", type: "file", label: "Screenshot", step: 0 },
    ],
  },
];
