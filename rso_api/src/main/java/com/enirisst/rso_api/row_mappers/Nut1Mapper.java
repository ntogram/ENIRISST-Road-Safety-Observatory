package com.enirisst.rso_api.row_mappers;
import com.enirisst.rso_api.models.Nut1;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public class Nut1Mapper implements  RowMapper<Nut1> {


    @Override
    public Nut1 mapRow(ResultSet rs, int rowNum) throws SQLException {
          return new Nut1(rs.getString("eu_code"),rs.getString("nut"),rs.getInt("YEAR_ID"),rs.getLong("accident_number"));
    }
}
