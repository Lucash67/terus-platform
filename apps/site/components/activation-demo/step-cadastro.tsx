"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input, Select } from "@terus/ui";
import { formatCnpj, formatPhone } from "@terus/schemas/self-onboarding";

import { Field, describedBy } from "@/components/onboarding/field";
import {
  Panel,
  StepNav,
  StepShell,
} from "@/components/activation-demo/step-shell";
import { DEMO_BASE } from "@/lib/constants/activation-demo";
import {
  demoCadastroSchema,
  useActivationDemo,
  type DemoCadastro,
} from "@/lib/activation-demo/store";

const FORM_ID = "demo-cadastro";

export function StepCadastro() {
  const router = useRouter();
  const { cadastro, setCadastro } = useActivationDemo();
  const {
    register,
    handleSubmit,
    setValue,
    setFocus,
    formState: { errors, isSubmitting },
  } = useForm<DemoCadastro>({
    resolver: zodResolver(demoCadastroSchema),
    defaultValues: cadastro ?? {
      contactName: "",
      email: "",
      phone: "",
      companyName: "",
      cnpj: "",
      segment: "retail",
      storeCount: undefined,
    },
  });

  const onSubmit = (data: DemoCadastro) => {
    setCadastro(data);
    router.push(`${DEMO_BASE}/erp`);
  };

  // Erro de validação: foco no primeiro campo com problema
  const onInvalid = (errs: Partial<Record<keyof DemoCadastro, unknown>>) => {
    const first = (Object.keys(errs) as (keyof DemoCadastro)[])[0];
    if (first) setFocus(first);
  };

  const err = (k: keyof DemoCadastro) => errors[k]?.message;

  return (
    <StepShell
      step={1}
      eyebrow="Cadastro"
      title={
        <>
          Vamos conhecer a <span className="text-gradient">sua operação</span>
        </>
      }
      description="Quem conduz a ativação e o tamanho da rede. Na demonstração, os dados ficam só neste navegador."
    >
      <Panel className="p-6 sm:p-8">
        <form
          id={FORM_ID}
          onSubmit={handleSubmit(onSubmit, onInvalid)}
          noValidate
        >
          <div className="grid gap-5 sm:grid-cols-2">
            <Field
              id="contactName"
              label="Nome do responsável"
              error={err("contactName")}
            >
              <Input
                id="contactName"
                placeholder="Quem conduz a ativação"
                autoComplete="name"
                aria-invalid={!!errors.contactName}
                aria-describedby={describedBy(
                  "contactName",
                  err("contactName"),
                )}
                {...register("contactName")}
              />
            </Field>
            <Field id="email" label="E-mail corporativo" error={err("email")}>
              <Input
                id="email"
                type="email"
                placeholder="voce@suarede.com.br"
                autoComplete="email"
                aria-invalid={!!errors.email}
                aria-describedby={describedBy("email", err("email"))}
                {...register("email")}
              />
            </Field>
            <Field id="phone" label="Telefone" error={err("phone")}>
              <Input
                id="phone"
                type="tel"
                inputMode="tel"
                placeholder="(85) 99999-0000"
                autoComplete="tel"
                aria-invalid={!!errors.phone}
                aria-describedby={describedBy("phone", err("phone"))}
                {...register("phone", {
                  onChange: (e) =>
                    setValue("phone", formatPhone(e.target.value)),
                })}
              />
            </Field>
            <Field
              id="companyName"
              label="Rede ou empresa"
              error={err("companyName")}
            >
              <Input
                id="companyName"
                placeholder="Nome fantasia ou razão social"
                autoComplete="organization"
                aria-invalid={!!errors.companyName}
                aria-describedby={describedBy(
                  "companyName",
                  err("companyName"),
                )}
                {...register("companyName")}
              />
            </Field>
            <Field id="cnpj" label="CNPJ" error={err("cnpj")}>
              <Input
                id="cnpj"
                inputMode="numeric"
                placeholder="00.000.000/0000-00"
                aria-invalid={!!errors.cnpj}
                aria-describedby={describedBy("cnpj", err("cnpj"))}
                {...register("cnpj", {
                  onChange: (e) => setValue("cnpj", formatCnpj(e.target.value)),
                })}
              />
            </Field>
            <Field id="segment" label="Segmento" error={err("segment")}>
              <Select
                id="segment"
                aria-invalid={!!errors.segment}
                {...register("segment")}
              >
                <option value="retail">Varejo</option>
                <option value="distribution">Distribuição</option>
                <option value="industry">Indústria</option>
              </Select>
            </Field>
            <Field
              id="storeCount"
              label="Número de lojas"
              error={err("storeCount")}
              className="sm:col-span-2 sm:max-w-56"
            >
              <Input
                id="storeCount"
                type="number"
                inputMode="numeric"
                min={1}
                placeholder="Ex.: 12"
                aria-invalid={!!errors.storeCount}
                aria-describedby={describedBy("storeCount", err("storeCount"))}
                {...register("storeCount")}
              />
            </Field>
          </div>
        </form>
      </Panel>
      <StepNav backHref={DEMO_BASE} formId={FORM_ID} loading={isSubmitting} />
    </StepShell>
  );
}
