"use client";

import { useEffect, useState } from "react";

type Props = { className?: string; label?: string };

const contacts = [
  { label: "手机", value: "13786073740", href: "tel:13786073740" },
  { label: "微信", value: "Kaiden1112" },
  { label: "邮箱", value: "fujujin2002@163.com", href: "mailto:fujujin2002@163.com" },
];

export function ContactButton({ className = "", label = "联系我" }: Props) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState("");

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => event.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  async function copy(value: string) {
    await navigator.clipboard.writeText(value);
    setCopied(value);
    window.setTimeout(() => setCopied(""), 1400);
  }

  return (
    <>
      <button className={className} type="button" onClick={() => setOpen(true)}>{label}</button>
      {open && (
        <div className="modal-backdrop" role="presentation" onMouseDown={() => setOpen(false)}>
          <section className="contact-modal" role="dialog" aria-modal="true" aria-labelledby="contact-title" onMouseDown={(e) => e.stopPropagation()}>
            <button className="modal-close" type="button" onClick={() => setOpen(false)} aria-label="关闭联系信息">×</button>
            <span className="section-kicker">CONTACT</span>
            <h2 id="contact-title">联系我</h2>
            <p>欢迎交流产品、AI 应用和社交体验。</p>
            <div className="contact-list">
              {contacts.map((contact) => (
                <div className="contact-item" key={contact.label}>
                  <div><span>{contact.label}</span>{contact.href ? <a href={contact.href}>{contact.value}</a> : <strong>{contact.value}</strong>}</div>
                  <button type="button" onClick={() => copy(contact.value)}>{copied === contact.value ? "已复制" : "复制"}</button>
                </div>
              ))}
            </div>
          </section>
        </div>
      )}
    </>
  );
}
