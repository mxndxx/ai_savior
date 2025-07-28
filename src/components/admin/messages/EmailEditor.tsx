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

  const renderContent = (template: { id: string | number; title: string }) => {
    return (
      <div className="p-4 text-sm text-gray-600">
        <p className="font-medium">{template.title}</p>
      </div>
    );
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
      renderContent={renderContent}
      onTemplateSelect={handleTemplateSelect}
    />
  );
};
