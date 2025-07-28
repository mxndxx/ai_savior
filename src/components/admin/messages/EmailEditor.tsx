import { TemplateSelector } from "./TemplateSelector";
import { convertKitApi } from "@/utils/convertkit";
import { useMessageSettingsContext } from "./MessageSettingsContext";

interface EmailEditorProps {
  channelLabel: string;
}

export const EmailEditor = ({ channelLabel }: EmailEditorProps) => {
  const { setEmailTemplateMetadata } = useMessageSettingsContext();
  const fetchTemplates = async (cursor?: string) => {
    const data = await convertKitApi.getEmailTemplates(cursor);
    return {
      templates: data.email_templates.map((template) => ({
        id: template.id,
        title: template.name,
      })),
      nextCursor: data.nextCursor,
    };
  };


  // Store template metadata for saving later
  const handleTemplateSelect = (template: any) => {
    if (template) {
      setEmailTemplateMetadata({
        id: template.id as number,
        name: template.title,
      });
    } else {
      setEmailTemplateMetadata(null);
    }
  };

  return (
    <TemplateSelector
      channelLabel={channelLabel}
      channel="email"
      fetchTemplates={fetchTemplates}
      onTemplateSelect={handleTemplateSelect}
    />
  );
};
