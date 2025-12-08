// File: components/sectors/Clinics/ProfileSection.tsx

"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User, Edit, Save, X, AlertTriangle, ShieldCheck, Trash2 } from "lucide-react"; // استيراد أيقونات واضحة
import Link from "next/link";

// --- تعريف الأنواع لضمان سلامة الكود ---
// هذا يضمن أن البيانات القادمة من config.json لها نفس البنية المتوقعة
type ProfileData = {
  title: string;
  editButtonText: string;
  saveButtonText: string;
  cancelButtonText: string;
  userData: {
    name: string;
    phone: string;
    email: string;
  };
  compliance: {
    privacyNotice: { text: string; linkText: string; href: string; };
    reportIssue: { text: string; linkText: string; href: string; };
    deleteAccount: { text: string; linkText: string; href: string; };
  };
};

interface ProfileSectionProps {
  data: ProfileData;
}

export default function ProfileSection({ data }: ProfileSectionProps) {
  // --- إدارة الحالة ---
  // isEditing: لتتبع ما إذا كنا في وضع العرض أو التعديل
  const [isEditing, setIsEditing] = useState(false);
  // formData: لتخزين قيم حقول الإدخال أثناء التعديل
  const [formData, setFormData] = useState(data.userData);

  // --- معالجات الأحداث ---
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSave = () => {
    // في المستقبل، هنا سنقوم باستدعاء دالة لإرسال البيانات إلى Supabase
    console.log("Saving data:", formData);
    setIsEditing(false);
    // يمكنك تحديث الحالة الرئيسية للتطبيق هنا إذا لزم الأمر
  };

  const handleCancel = () => {
    // إعادة تعيين بيانات النموذج إلى الأصلية عند الإلغاء
    setFormData(data.userData);
    setIsEditing(false);
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-4 md:p-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <User className="h-6 w-6 text-primary" />
              <CardTitle>{data.title}</CardTitle>
            </div>
            {!isEditing && (
              <Button variant="outline" size="sm" onClick={() => setIsEditing(true)}>
                <Edit className="h-4 w-4 mr-2" />
                {data.editButtonText}
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* حقول عرض أو تعديل البيانات */}
          <div className="space-y-4">
            <div>
              <Label htmlFor="name">الاسم</Label>
              {isEditing ? (
                <Input id="name" value={formData.name} onChange={handleInputChange} />
              ) : (
                <p className="text-muted-foreground pt-2">{formData.name}</p>
              )}
            </div>
            <div>
              <Label htmlFor="phone">رقم الجوال</Label>
              {isEditing ? (
                <Input id="phone" value={formData.phone} onChange={handleInputChange} />
              ) : (
                <p className="text-muted-foreground pt-2">{formData.phone}</p>
              )}
            </div>
            <div>
              <Label htmlFor="email">البريد الإلكتروني</Label>
              {isEditing ? (
                <Input id="email" type="email" value={formData.email} onChange={handleInputChange} />
              ) : (
                <p className="text-muted-foreground pt-2">{formData.email}</p>
              )}
            </div>
          </div>

          {/* أزرار الحفظ والإلغاء في وضع التعديل */}
          {isEditing && (
            <div className="flex justify-end gap-2 pt-4">
              <Button variant="outline" onClick={handleCancel}>
                <X className="h-4 w-4 mr-2" />
                {data.cancelButtonText}
              </Button>
              <Button onClick={handleSave}>
                <Save className="h-4 w-4 mr-2" />
                {data.saveButtonText}
              </Button>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex flex-col items-start gap-4 text-sm text-muted-foreground border-t pt-6">
          {/* قسم الامتثال وحماية البيانات */}
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-green-600" />
            <p>
              {data.compliance.privacyNotice.text}{" "}
              <Link href={data.compliance.privacyNotice.href} className="underline hover:text-primary">
                {data.compliance.privacyNotice.linkText}
              </Link>
            </p>
          </div>
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 text-yellow-600" />
            <p>
              {data.compliance.reportIssue.text}{" "}
              <Link href={data.compliance.reportIssue.href} className="underline hover:text-primary">
                {data.compliance.reportIssue.linkText}
              </Link>
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Trash2 className="h-4 w-4 text-red-600" />
            <p>
              {data.compliance.deleteAccount.text}{" "}
              <Link href={data.compliance.deleteAccount.href} className="underline hover:text-primary">
                {data.compliance.deleteAccount.linkText}
              </Link>
            </p>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
