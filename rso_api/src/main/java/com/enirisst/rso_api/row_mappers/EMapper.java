package com.enirisst.rso_api.row_mappers;

import com.enirisst.rso_api.models.E;
import com.enirisst.rso_api.models.Nut1;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

import static java.lang.Math.round;


public class EMapper implements RowMapper<E> {


    @Override
    public E mapRow(ResultSet rs, int rowNum) throws SQLException {
        return new E(rs.getInt("YEAR_ID"),round(rs.getDouble("indicator")));
    }
}