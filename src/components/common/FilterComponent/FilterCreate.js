import React from 'react';
import { Grid } from '@material-ui/core';
import FilterDialog from './components/FilterDialog';
import { Container } from './Filter.styled';
import AppButton from '../AppButton/AppButton';

export default function FilterCreate({ filterComponent, openFilter = true, createComponent, btnTitle }) {

    return (
        <Container container>
            <Grid item></Grid>
            <Grid item container justifyContent='flex-end' xs={12} sm={6} md={6}>
                <Grid item>
                    {filterComponent && openFilter ? (
                        <FilterDialog>
                            {({ close }) => {
                                var componentInsideDialogMoreProps = React.cloneElement(
                                    filterComponent,
                                    { closeDialog: close }
                                );
                                return (
                                    <Grid>
                                        {componentInsideDialogMoreProps}
                                    </Grid>
                                );
                            }}
                        </FilterDialog>
                    ) : null}
                </Grid>
                {createComponent ?
                    <Grid item>
                        <AppButton
                            variant="fill"
                            fontSize={15}
                            onClick={createComponent}
                        >
                            {btnTitle}
                        </AppButton>
                    </Grid> : null}
            </Grid>
        </Container>
    );
}
