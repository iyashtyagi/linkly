import type { faqsType, featureTypes, Testimonials } from "@/types/linkly-type";
import { Zap, BarChart, FileCode, QrCode, Lock, Globe } from "lucide-react";

export const faqs: faqsType[] = [
    {
        question: "What is Linkly?",
        answer: "Linkly is a free and reliable URL shortener that helps you create short, shareable links with built-in analytics.",
    },
    {
        question: "Is Linkly free to use?",
        answer: "Yes! Linkly is completely free for everyone—no hidden charges or premium plans.",
    },
    {
        question: "Do Linkly links expire?",
        answer: "No, Linkly links do not expire. Once created, your links stay active unless you manually delete them.",
    },
    {
        question: "Can I track clicks on my short links?",
        answer: "Yes, Linkly tracks your clicks, including device type, browser, location, and more.",
    },
    {
        question: "Can I share links using QR codes?",
        answer: "Absolutely! Linkly generates a QR code for every link you create, perfect for both digital and print sharing.",
    },
];


export const features: featureTypes[] = [
    {
        icon: Zap,
        title: "One-Click Shortening",
        description: "Quickly shorten any long URL with a single click—no account or setup required.",
    },
    {
        icon: BarChart,
        title: "Real-Time Click Tracking",
        description: "Monitor clicks on your links including device type, location, and browser in real-time.",
    },
    {
        icon: QrCode,
        title: "Built-in QR Code Generator",
        description: "Automatically generate QR codes for every short link, ready for print or digital sharing.",
    },
    {
        icon: FileCode,
        title: "Developer Friendly",
        description: "Clean API responses make it easy to integrate Linkly into any project or dashboard.",
    },
    {
        icon: Globe,
        title: "Geo Insights",
        description: "Understand where your traffic is coming from with country, state, and city-level data.",
    },
    {
        icon: Lock,
        title: "Secure by Default",
        description: "All Linkly URLs use HTTPS to ensure your short links are safe and trustworthy.",
    },
];


export const testimonials: Testimonials[] = [
    {
        text: "Linkly makes sharing URLs so much easier. I love the click tracking—it helps me understand where my traffic is coming from!",
        author: "Priya Verma",
        role: "Content Creator",
    },
    {
        text: "Clean, fast, and simple. Linkly is the best URL shortener I've used, especially with its custom domain support.",
        author: "Rahul Mehta",
        role: "Startup Founder",
    },
    {
        text: "The Linkly API was easy to integrate into our backend, and it works flawlessly. Highly recommended!",
        author: "Ananya Roy",
        role: "Full Stack Developer",
    },
];
