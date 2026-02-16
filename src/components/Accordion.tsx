'use client';

import React from 'react';
import * as RadixAccordion from '@radix-ui/react-accordion';
import { ChevronDownIcon } from '@radix-ui/react-icons';


interface AccordionDetail {
  icon: React.ReactNode;
  text: string;
}

interface AccordionItem {
  type: string;
  details: AccordionDetail[];
}

interface AccordionProps {
  items: AccordionItem[];
}

const Accordion = ({ items }: AccordionProps) => {
  return (
    <div className="w-full max-w-4xl mx-auto">
      <RadixAccordion.Root type="single" collapsible className="AccordionRoot w-full">
        {items.map((item, index) => (
          <RadixAccordion.Item key={index} value={`item-${index}`} className="AccordionItem mb-2" id={`accordion-item-${index}`}>
            <RadixAccordion.Trigger 
              className="AccordionTrigger flex items-center justify-between p-4 bg-gray-100 border border-gray-200 rounded-t-lg w-full"
              id={`accordion-trigger-${index}`}
            >
              {item.type}
              <ChevronDownIcon className="AccordionChevron" aria-hidden />
            </RadixAccordion.Trigger>
            <RadixAccordion.Content 
              className="AccordionContent p-4 bg-white border-x border-b border-gray-200 rounded-b-lg"
              id={`accordion-content-${index}`}
            >
              <div className="AccordionContentText">
                {item.details.map((detail, detailIndex) => (
                  <li key={detailIndex} className="text-gray-700 flex items-center mb-2 last:mb-0">
                    {detail.icon}
                    <span className="ml-2">{detail.text}</span>
                  </li>
                ))}
              </div>
            </RadixAccordion.Content>
          </RadixAccordion.Item>
        ))}
      </RadixAccordion.Root>
    </div>
  );
};

export default Accordion;
