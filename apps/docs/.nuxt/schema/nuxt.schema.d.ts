export interface NuxtCustomSchema {
  appConfig?: {
    /**
     * Nuxt Icon
     *
     * Configure the defaults of Nuxt Icon
     *
     */
    nuxtIcon?: {
      /**
       * Icon Size
       *
       * Set the default icon size. Set to false to disable the sizing of icon in style.
       *
       * @default "1em"
       *
       * @studioIcon material-symbols:format-size-rounded
       */
      size?: string | false;

      /**
       * CSS Class
       *
       * Set the default CSS class
       *
       * @default ""
       *
       * @studioIcon material-symbols:css
       */
      class?: string;

      /**
       * Icon aliases
       *
       * Define Icon aliases to update them easily without code changes.
       *
       *
       * @studioIcon material-symbols:star-rounded
       *
       * @studioInputObjectValueType icon
       */
      aliases?: { [alias: string]: string };
    };

    prose?: {
      copyButton?: {
        /** @default "ph:copy" */
        iconCopy?: string;

        /** @default "ph:check" */
        iconCopied?: string;
      };

      headings?: {
        /** @default "ph:link" */
        icon?: string | false;
      };

      h1?: {
        /** @default "" */
        icon?: string | false;
      };

      h2?: {
        /** @default "" */
        icon?: string | false;
      };

      h3?: {
        /** @default "" */
        icon?: string | false;
      };

      h4?: {
        /** @default "" */
        icon?: string | false;
      };

      h5?: {
        /** @default "" */
        icon?: string | false;
      };

      h6?: {
        /** @default "" */
        icon?: string | false;
      };
    };

    docus?: {
      /** @default "Docus" */
      title?: string;

      /** @default "%s · Docus" */
      titleTemplate?: string;

      /** @default "The best place to start your documentation." */
      description?: string;

      /** @default "https://user-images.githubusercontent.com/904724/185365452-87b7ca7b-6030-4813-a2db-5e65c785bf88.png" */
      image?: string;

      socials?: {
        /** @default "" */
        twitter?: string;

        /** @default "" */
        github?: string;

        /** @default "" */
        facebook?: string;

        /** @default "" */
        instagram?: string;

        /** @default "" */
        tiktok?: string;

        /** @default "" */
        youtube?: string;

        /** @default "" */
        medium?: string;
      };

      /** @default "default" */
      layout?: "default" | "page";

      aside?: {
        /** @default 0 */
        level?: number;

        /** @default false */
        collapsed?: boolean;

        exclude?: string[];
      };

      header?: {
        /** @default "" */
        title?: string;

        /** @default false */
        logo?: boolean | string | { dark: string; light: string };

        /** @default false */
        showLinkIcon?: boolean;

        exclude?: string[];

        /** @default false */
        fluid?: boolean;
      };

      main?: {
        /** @default false */
        fluid?: boolean;

        /** @default true */
        padded?: boolean;
      };

      footer?: {
        credits?: false | { icon: string; text: string; href: string };

        textLinks?: Array<{
          /**
           * URL when clicking the link
           *
           */
          href: string;

          /**
           * Text of the link
           *
           */
          text: string;

          /**
           * Target attribute of the link
           *
           */
          target?: string;

          /**
           * Rel attribute of the link
           *
           */
          rel?: string;
        }>;

        iconLinks?: Array<{
          /**
           * Icon name
           *
           */
          icon: string;

          /**
           * Link when clicking on the icon
           *
           */
          href: string;

          /**
           * Label of the icon
           *
           */
          label?: string;

          /**
           * Rel attribute of the link
           *
           */
          rel?: string;
        }>;

        /** @default true */
        fluid?: boolean;
      };

      github?: {
        /** @default "https://github.com" */
        baseUrl?: string;

        /** @default "" */
        dir?: string;

        /** @default "" */
        branch?: string;

        /** @default "" */
        repo?: string;

        /** @default "" */
        owner?: string;

        /** @default false */
        edit?: boolean;
      };
    };
  };
}
export type CustomAppConfig = Exclude<NuxtCustomSchema["appConfig"], undefined>;
type _CustomAppConfig = CustomAppConfig;

declare module "@nuxt/schema" {
  interface NuxtConfig extends Omit<NuxtCustomSchema, "appConfig"> {}
  interface NuxtOptions extends Omit<NuxtCustomSchema, "appConfig"> {}
  interface CustomAppConfig extends _CustomAppConfig {}
}

declare module "nuxt/schema" {
  interface NuxtConfig extends Omit<NuxtCustomSchema, "appConfig"> {}
  interface NuxtOptions extends Omit<NuxtCustomSchema, "appConfig"> {}
  interface CustomAppConfig extends _CustomAppConfig {}
}
