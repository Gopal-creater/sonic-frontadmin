import { Chip, Grid } from "@material-ui/core";
import { ControlPoint, RemoveCircleOutline } from "@material-ui/icons";
import cogoToast from "cogo-toast";
import React from "react";
import AppButton from "../../../components/common/AppButton/AppButton";
import { StyledTextField } from "../../../StyledComponents/StyledAppTextInput/StyledAppTextInput";

//eslint-disable-next-line
var formatForObjectProperty = /[ `!@#$%^&*()+\-=\[\]{};':"\\|,.<>\/?~]/;

export function KeyValueRowItem({
  keyText,
  valueText,
  onChangeKey,
  onChangeValue,
  onDelete,
  index,
  disabled,
  ...props
}) {
  return (
    <div>
      <Chip
        style={{ height: "auto", background: "transparent", marginTop: 5 }}
        onDelete={onDelete}
        disabled={disabled}
        deleteIcon={<RemoveCircleOutline />}
        label={
          <Grid container spacing={2}>
            <Grid item>
              <StyledTextField
                id={`key-${index}`}
                labelText="Key"
                placeholder="Key"
                inputProps={{
                  value: keyText,
                  onChange: onChangeKey,
                }}
              />
            </Grid>
            <Grid item>
              <StyledTextField
                id={`value-${index}`}
                labelText="Value"
                placeholder="Value"
                inputProps={{
                  value: valueText,
                  onChange: onChangeValue,
                  multiline: true,
                }}
              />
            </Grid>
          </Grid>
        }
        {...props}
      />
    </div>
  );
}

export default function KeyValue({
  data = {},
  disabled,
  onChangeData,
  addButtonProps,
  containerStyle,
}) {
  return (
    <div>
      <Grid container spacing={1} style={{ ...containerStyle }}>
        <AppButton
          variant={"none"}
          startIcon={<ControlPoint />}
          style={{ paddingLeft: 5 }}
          onClick={() => {
            const modifiedData = { ...data, "": "" };
            onChangeData(modifiedData);
          }}
          disabled={disabled}
          {...addButtonProps}
        >
          Add Metadata (Key/Value)
        </AppButton>
      </Grid>
      {Object.entries(data).map(([key, value], index) => {
        return (
          <KeyValueRowItem
            keyText={key}
            valueText={value}
            onChangeKey={(e) => {
              const oldData = { ...data };
              const newKey = e.target.value;

              if (formatForObjectProperty.test(newKey)) {
                cogoToast.error("can not contain special characters on key");
                return;
              }

              if (oldData[newKey]) {
                cogoToast.error("key already present");
                return;
              }
              const oldDataIntoArrayEntries = Object.entries(oldData);
              oldDataIntoArrayEntries[index][0] = newKey;
              const modifiedData = Object.fromEntries(oldDataIntoArrayEntries);
              onChangeData(modifiedData);
            }}
            onChangeValue={(e) => {
              const oldData = { ...data };
              oldData[key] = e.target.value;
              onChangeData(oldData);
            }}
            onDelete={() => {
              const oldData = { ...data };
              delete oldData[key];
              onChangeData(oldData);
            }}
            index={index}
            key={index}
            disabled={disabled}
          />
        );
      })}
    </div>
  );
}
