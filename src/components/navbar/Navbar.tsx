import CardNav from "@/reactbits/Components/CardNav/CardNav";

const Navbar = () => {
  const items = [
    {
      label: "About",
      bgColor: "#0D0716",
      textColor: "#fff",
      links: [
        {
          label: "Company",
          href: "/about/company",
          ariaLabel: "About Company",
        },
        {
          label: "Careers",
          href: "/about/careers",
          ariaLabel: "About Careers",
        },
      ],
    },
    {
      label: "Collections",
      bgColor: "#170D27",
      textColor: "#fff",
      links: [
        {
          label: "Men",
          href: "/collections/men",
          ariaLabel: "Men collections",
        },
        {
          label: "Women",
          href: "/collections/women",
          ariaLabel: "Women collections",
        },
        {
          label: "Kids",
          href: "/collections/kids",
          ariaLabel: "Kids collections",
        },
      ],
    },
    {
      label: "Contact",
      bgColor: "#271E37",
      textColor: "#fff",
      links: [
        {
          label: "Email",
          href: "mailto:info@runique.com",
          ariaLabel: "Email us",
        },
        {
          label: "Twitter",
          href: "https://twitter.com/runique",
          ariaLabel: "Twitter",
        },
        {
          label: "LinkedIn",
          href: "https://linkedin.com/company/runique",
          ariaLabel: "LinkedIn",
        },
      ],
    },
  ];

  return (
    <div className="sticky top-0 z-50">
      <CardNav
        logo={"/assets/Logo/RuniqueLogo.png"}
        logoAlt="Company Logo"
        items={items}
        baseColor="#fff"
        menuColor="#000"
        buttonBgColor="#111"
        buttonTextColor="#fff"
        buttonLink="/login"
        buttonText="Login"
        ease="power3.out"
      />
    </div>
  );
};

export default Navbar;
