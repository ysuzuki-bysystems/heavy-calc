"use client";

import { useCallback, useState } from "react";

import { calc } from "@/lib/calc";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Empty } from "@/components/ui/empty";
import { Field, FieldLabel, FieldSet } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { NativeSelect, NativeSelectOption } from "@/components/ui/native-select";
import { Spinner } from "@/components/ui/spinner";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

function UiThread(): React.ReactNode {
  const [state, setState] = useState<boolean>(false);
  const handleClicked = useCallback(() => {
    setState(true);
    calc(10 * 1000);
    setState(false);
  }, []);

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>UI thread</CardTitle>
      </CardHeader>
      <CardContent>
        <Button onClick={handleClicked} disabled={state}>
          {state && <><Spinner /> Calculating...</>}
          {!state && <>Calculate</>}
        </Button>
      </CardContent>
    </Card>
  );
}

function WebWorker(): React.ReactNode {
  const [state, setState] = useState<boolean>(false);
  const handleClicked = useCallback(() => {
    (async () => {
      setState(true);

      const worker = new Worker(new URL("./worker.ts", import.meta.url));

      const { resolve, reject, promise } = Promise.withResolvers<void>();
      worker.addEventListener("message", (event) => event.data === "DONE" && resolve());
      worker.addEventListener("error", reject);

      worker.postMessage(10 * 1000);

      await promise;
      setState(false);
    })();
  }, []);

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Web Worker</CardTitle>
      </CardHeader>
      <CardContent>
        <Button onClick={handleClicked} disabled={state}>
          {state && <><Spinner /> Calculating...</>}
          {!state && <>Calculate</>}
        </Button>
      </CardContent>
    </Card>
  );
}

function Components(): React.ReactNode {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Components</CardTitle>
      </CardHeader>
      <CardContent>
        <FieldSet>
          <Field>
            <FieldLabel>Spinner</FieldLabel>
            <Spinner />
          </Field>
          <Field>
            <FieldLabel>Input</FieldLabel>
            <Input />
          </Field>
          <Field>
            <FieldLabel>Select</FieldLabel>
            <NativeSelect>
              <NativeSelectOption></NativeSelectOption>
              <NativeSelectOption>1</NativeSelectOption>
              <NativeSelectOption>2</NativeSelectOption>
              <NativeSelectOption>3</NativeSelectOption>
            </NativeSelect>
          </Field>
          <Field>
            <FieldLabel>Button</FieldLabel>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline">Button</Button>
              </TooltipTrigger>
              <TooltipContent>
                It is Button.
              </TooltipContent>
            </Tooltip>
          </Field>
        </FieldSet>
      </CardContent>
    </Card>
  );
}

export default function Page(): React.ReactNode {
  return (
    <Empty>
      <UiThread />
      <WebWorker />
      <Components />
    </Empty>
  );
}
