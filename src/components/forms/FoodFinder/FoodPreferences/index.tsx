import Allergens from "./Allergens";
import Preferences from "./Preferences";

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
        <Allergens form={form} theme={theme} />
      </section>
      <section id="preferences" className="py-2 pt-4">
        <Preferences form={form} theme={theme} />
      </section>
    </div>
  );
};

export default FoodPreferencesSection;
