import { XmlAttributeComponent, XmlComponent } from "@file/xml-components";

export interface ITextOutlineAttributesProperties {
    readonly w?: number;
    readonly cap?: "rnd" | "sq" | "flat";
    readonly cmpd?: "sng" | "dbl" | "thickThin" | "thinThick" | "tri";
}

class TextOutlineAttributes extends XmlAttributeComponent<ITextOutlineAttributesProperties> {
    protected readonly xmlKeys = {
        w: "w14:w",
        cap: "w14:cap",
        cmpd: "w14:cmpd",
    };
}

export interface ISolidFillProperties {
    readonly color: string;
}

class SolidFill extends XmlComponent {
    public constructor(color: string) {
        super("w14:solidFill");
        this.root.push(
            new SrgbColor(color),
        );
    }
}

class SrgbColor extends XmlComponent {
    public constructor(color: string) {
        super("w14:srgbClr");
        this.root.push(new SrgbColorAttributes({ val: color }));
    }
}

class SrgbColorAttributes extends XmlAttributeComponent<{ readonly val: string }> {
    protected readonly xmlKeys = { val: "w14:val" };
}

class PrstDash extends XmlComponent {
    public constructor(val: string) {
        super("w14:prstDash");
        this.root.push(new PrstDashAttributes({ val }));
    }
}

class PrstDashAttributes extends XmlAttributeComponent<{ readonly val: string }> {
    protected readonly xmlKeys = { val: "w14:val" };
}

class Bevel extends XmlComponent {
    public constructor() {
        super("w14:bevel");
    }
}

export interface ITextOutlineOptions extends ITextOutlineAttributesProperties {
    readonly solidFill?: ISolidFillProperties;
    readonly prstDash?: "solid" | "dot" | "dash" | "lgDash" | "dashDot" | "lgDashDot" | "lgDashDotDot" | "sysDash" | "sysDot" | "sysDashDot" | "sysDashDotDot";
    readonly bevel?: boolean;
}

export class RunTextOutline extends XmlComponent {
    public constructor(options: ITextOutlineOptions) {
        super("w14:textOutline");

        const attributes: ITextOutlineAttributesProperties = {
            w: options.w,
            cap: options.cap,
            cmpd: options.cmpd,
        };
        this.root.push(new TextOutlineAttributes(attributes));

        if (options.solidFill) {
            this.root.push(new SolidFill(options.solidFill.color));
        }

        if (options.prstDash) {
            this.root.push(new PrstDash(options.prstDash));
        }

        if (options.bevel) {
            this.root.push(new Bevel());
        }
    }
}