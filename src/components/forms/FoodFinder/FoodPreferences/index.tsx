import AllergensSection from "./Allergens";
import PreferencesSection from "./Preferences";

const FoodPreferencesSection = ({
  form,
  theme,
}: {
  form: any;
  theme: string;
}) => {
  return (
    <div>
      <h3 className="pb-4 text-xl font-semibold ">Food Preferences</h3>
      <section id="allergens" className="py-2">
        <AllergensSection form={form} theme={theme} />
      </section>
      <section id="preferences" className="py-2 pt-4">
        <PreferencesSection form={form} theme={theme} />
      </section>
    </div>
  );
};

export default FoodPreferencesSection;
