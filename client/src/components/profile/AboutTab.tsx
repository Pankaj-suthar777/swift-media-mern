const AboutTab = ({ about }: { about: string }) => {
  if (!about) {
    return null;
  }

  return (
    <div className="w-full clear-start px-4 mt-6">
      <div
        className="about text-start"
        dangerouslySetInnerHTML={{
          __html: about,
        }}
      ></div>
    </div>
  );
};

export default AboutTab;
