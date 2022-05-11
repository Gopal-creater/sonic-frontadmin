import React from 'react';
import { Grid } from '@material-ui/core';
import FilterDialog from './components/FilterDialog';
import { Container } from './Filter.styled';
import AppButton from '../AppButton/AppButton';

export default function FilterCreate({ filterComponent, openFilter = true, createComponent, btnTitle }) {

    return (
        <Container container>
            <Grid item></Grid>
            <Grid style={{ display: 'flex', justifyContent: 'flex-end' }} item xs={12} md={6}>
                <Grid>
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
                    <Grid>
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
