"use client";

import type React from "react";
import { useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";
import config from "@/config.json";

// استيراد الأيقونات
import { Loader2, CheckCircle, XCircle } from "lucide-react";

// استيراد مكونات واجهة المستخدم
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";

// استيراد مكون الهاتف
import PhoneInput, { type Value } from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import '@/phone-input.css';

const ContactSection = ({ data }: { data: any }) => {
  const [formData, setFormData] = useState<{ [key: string]: any }>({});
  const [consent, setConsent] = useState(false);
  const [phoneValue, setPhoneValue] = useState<Value | undefined>();
      
  const [isLoading, setIsLoading] = useState(false);
  const [formStatus, setFormStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!consent) {
      alert("يجب الموافقة على سياسة الخصوصية أولاً.");
      return;
    }

    setIsLoading(true);
    setFormStatus('idle');

    // التعديل الذكي: مطابقة البيانات مع أعمدة جدول messages
    const submissionData = {
      name: formData.name,
      email: formData.email,
      phone: phoneValue,
      service_type: formData.service,
      message: formData.message,
    };

    // إرسال البيانات إلى الجدول الصحيح messages
    const { error } = await supabase.from('messages').insert([submissionData]);

    setIsLoading(false);

    if (error) {
      console.error('Supabase error:', error);
      setFormStatus('error');
    } else {
      setFormStatus('success');
      setFormData({});
      setPhoneValue(undefined);
      setConsent(false);
    }
  };

  if (formStatus === 'success') {
    return (
      <section className="w-full bg-gray-50 dark:bg-gray-900 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-center">
          <Card className="w-full max-w-lg text-center p-8 border-green-200">
            <CheckCircle className="mx-auto h-12 w-12 text-green-500" />
            <h2 className="mt-4 text-2xl font-bold">تم الإرسال بنجاح!</h2>
            <p className="mt-2 text-gray-600">شكراً لتواصلك معنا. سنقوم بالرد في أقرب وقت ممكن.</p>
            <Button className="mt-6" onClick={() => setFormStatus('idle')}>إرسال رد آخر</Button>
          </Card>
        </div>
      </section>
    );
  }

  if (formStatus === 'error') {
    return (
      <section className="w-full bg-gray-50 dark:bg-gray-900 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-center">
          <Card className="w-full max-w-lg text-center p-8 border-red-200">
            <XCircle className="mx-auto h-12 w-12 text-red-500" />
            <h2 className="mt-4 text-2xl font-bold">حدث خطأ ما!</h2>
            <p className="mt-2 text-gray-600">عذراً، لم نتمكن من إرسال رسالتك. يرجى المحاولة مرة أخرى لاحقاً.</p>
            <Button className="mt-6" onClick={() => setFormStatus('idle')}>حاول مرة أخرى</Button>
          </Card>
        </div>
      </section>
    );
  }

  return (
    <section className="w-full bg-gray-50 dark:bg-gray-900 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-center">
        <Card className="w-full max-w-lg shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center">{data.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="grid gap-6">
              {data.fields.name.show && ( <div className="space-y-2"> <Label htmlFor="name">{data.fields.name.label}</Label> <Input id="name" name="name" placeholder={data.fields.name.placeholder} onChange={handleInputChange} required={data.fields.name.required} /> </div> )}
              {data.fields.email.show && ( <div className="space-y-2"> <Label htmlFor="email">{data.fields.email.label}</Label> <Input id="email" name="email" type="email" placeholder={data.fields.email.placeholder} onChange={handleInputChange} required={data.fields.email.required} /> </div> )}
              {data.fields.phone.show && ( <div className="space-y-2"> <Label htmlFor="phone">{data.fields.phone.label}</Label> <PhoneInput id="phone" name="phone" international defaultCountry="SA" value={phoneValue} onChange={setPhoneValue} className="PhoneInput" placeholder={data.fields.phone.placeholder} required={data.fields.phone.required} /> </div> )}
              {data.fields.message.show && ( <div className="space-y-2"> <Label htmlFor="message">{data.fields.message.label}</Label> <Textarea id="message" name="message" placeholder={data.fields.message.placeholder} onChange={handleInputChange} required={data.fields.message.required} /> </div> )}
              {data.fields.service.show && ( <div className="space-y-2"> <Label htmlFor="service">{data.fields.service.label}</Label> <Select name="service" onValueChange={(value) => handleSelectChange("service", value)}> <SelectTrigger id="service"><SelectValue placeholder="اختر خدمة" /></SelectTrigger> <SelectContent> {data.fields.service.options.map((option: string) => (<SelectItem key={option} value={option}>{option}</SelectItem>))} </SelectContent> </Select> </div> )}
              
              <div className="flex items-center space-x-2 space-x-reverse">
                <Checkbox id="consent" onCheckedChange={(checked) => setConsent(checked as boolean)} />
                <Label htmlFor="consent" className="text-sm font-normal text-gray-600 leading-relaxed cursor-pointer">
                  {data.consentText.split('[')[0]}
                  <Link href={config.site.privacyPolicyLink} className="text-primary font-medium hover:underline">
                    {data.consentText.match(/\[(.*?)\]/)?.[1]}
                  </Link>
                  {data.consentText.split(']')[1]}
                </Label>
              </div>
            </form>
          </CardContent>
          <CardFooter>
            <Button onClick={handleSubmit} className="w-full text-lg h-12" disabled={!consent || isLoading}>
              {isLoading ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : null}
              {isLoading ? 'جارٍ الإرسال...' : data.submitButton}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </section>
  )
};

export default ContactSection;