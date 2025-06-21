import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import companies from "../data/companies.json";
import Autoplay from "embla-carousel-autoplay";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import faqs from "../data/faq.json"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const LandingPage = () => {
    return (
        <main className="flex flex-col gap-10 sm: py-10 sm:py-20 px-5">
            <section className="text-center ">
                <h1 className="flex flex-col items-center justify-center text-4xl font-extrabold sm:text-6xl lg:text-8xl gradient-title tracking-tighter py-4 ">
                    Find Your Dream Job{" "}
                    <span className="flex items-center gap-2 sm:gap-6">and get{" "}
                        <img src="/NextRole.jpg" alt="NextRole logo" className="h-14 sm:h-24 lg:h-32" />
                    </span>
                </h1>
                <p className="text-gray-300 sm:mt-4 text-xs sm:text-xl">Explore the thousands of job listings or find the perfect candidate</p>
            </section>
            <div className="flex gap-6 justify-center ">
                <Link to="/jobs">
                    <Button variant="blue" size="xl">Find Jobs</Button>
                </Link>
                <Link to="/post-jobs">
                    <Button variant="destructive" size="xl">Post a Jobs</Button>
                </Link>
            </div>
            <Carousel plugins={[Autoplay({ delay: 2000 })]}>
                <CarouselContent className="flex gap-5 lg:gap-20 items-center">{companies.map(({ id, name, path }) => {
                    return (
                        <CarouselItem key={id} className="basis-1/3 lg:basis-1/6">
                            <img src={path} alt={name} className="h-9 sm:h-16 object-contain"></img>
                        </CarouselItem>
                    )
                })}</CarouselContent>
            </Carousel>
            <div>
                <img src="/banner2.png" alt="banner" className="w-full h-auto" />
            </div>
            <section className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <Card>
                    <CardHeader>
                        <CardTitle>For Employers</CardTitle>
                    </CardHeader>
                    <CardContent>
                        Post jobs, manage applications and find the best condidate.
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>For Job Seekers</CardTitle>
                    </CardHeader>
                    <CardContent>
                        Search and Apply for jobs, track applications and more.
                    </CardContent>
                </Card>
            </section>
            <Accordion type="single" collapsible>
                {faqs.map((faq, index) => {
                    return (
                        <AccordionItem key={index} value={`item${index+1}`}>
                            <AccordionTrigger>
                                {faq.question}
                            </AccordionTrigger>
                            <AccordionContent>
                                {faq.answer}
                            </AccordionContent>
                        </AccordionItem>
                    )
                })}
            </Accordion>
        </main>
    )
}
export default LandingPage;