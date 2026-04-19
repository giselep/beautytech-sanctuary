
O utilizador reporta que em `/tratamento/hifu-facial` não consegue escolher uma variante para pagar.

Olhando ao código:
- `TreatmentPage.tsx` exige seleção via `subTreatmentPriceMap[treatment.id]` para tratamentos com sub-opções.
- O HIFU Facial em `treatments.ts` tem `subTreatments` (várias zonas: rosto completo, papada, pescoço, etc.) mas presumivelmente NÃO está em `subTreatmentPriceMap` no `stripe-prices.ts`.
- Resultado: `hasSubPrices = false`, `hasSinglePrice = false` → `canPay = false` → botões "Comprar Online" e "Oferecer de Presente" ficam desativados, e a tabela de preços não fica clicável (não aparecem os radio buttons).

Preciso confirmar lendo `src/data/stripe-prices.ts` e o registo do hifu-facial em `treatments.ts` para listar as variantes exatas e confirmar quais Stripe Price IDs faltam.

## Plano

**Problema:** A página HIFU Facial mostra a tabela de preços mas não permite selecionar/comprar nenhuma variante porque os Price IDs do Stripe não estão mapeados para este tratamento.

**O mesmo problema afeta provavelmente outros tratamentos com sub-variantes que não estão em `subTreatmentPriceMap`.**

### Etapas

1. **Auditar** `src/data/stripe-prices.ts` vs `src/data/treatments.ts`:
   - Listar todos os tratamentos com `subTreatments` que NÃO têm entrada em `subTreatmentPriceMap`
   - Listar tratamentos sem sub-variantes que NÃO têm entrada em `treatmentPriceMap`

2. **Criar produtos e preços no Stripe** (via ferramentas Stripe) para cada variante em falta — começando por HIFU Facial (rosto completo, papada, pescoço, contorno olhos, etc. conforme definido nos `subTreatments`).

3. **Atualizar `src/data/stripe-prices.ts`** adicionando os novos Price IDs ao `subTreatmentPriceMap` (e ao `treatmentPriceMap` quando aplicável).

4. **Melhoria UX (pequena):** Quando um tratamento tem `subTreatments` mas não está mapeado em Stripe, atualmente os botões aparecem desativados sem explicação. Vou adicionar uma mensagem clara tipo "Pagamento online indisponível — agende ou contacte por WhatsApp" para evitar confusão até todos os preços estarem configurados.

### Pergunta antes de avançar

Antes de criar os produtos Stripe preciso confirmar contigo o âmbito, porque envolve criar entradas reais na tua conta Stripe.

